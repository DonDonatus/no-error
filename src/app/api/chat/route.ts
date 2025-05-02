// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
// Fix the import path - adjust this to match your actual project structure
import { searchEmbeddings, getNavigationHelp } from '../../../../lib/embeddings/search';

// Interface for message structure
interface Message {
  role: string;
  content: string;
}

// Interface for search result
interface SearchResult {
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    category: string;
    isNavigation?: boolean;
    importance?: number;
    [key: string]: any;
  };
  similarity?: number;
}

// Navigation-related keywords for query classification
const NAVIGATION_KEYWORDS = [
  'navigate', 'find', 'go to', 'where is', 'how do i get to',
  'location of', 'link to', 'menu', 'page for', 'section on',
  'where can i find', 'how to access', 'look for', 'searching for',
  'where should i click', 'how to get to', 'where', 'homepage',
  'measurements', 'measure', 'sizing', 'size', 'account icon'
];

// Check if a query is navigation-related
function isNavigationQuery(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  return NAVIGATION_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  console.log("Processing request with messages:", messages);
  
  // Check if API key is available
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY not found in environment variables");
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }
  
  try {
    // Extract the last user message for context searching
    const lastUserMessage = messages.findLast(
      (message: Message) => message.role === 'user'
    )?.content || '';
    
    let searchResults: SearchResult[] = [];
    let navigationContext = '';
    
    // Check if this appears to be a navigation-related query
    if (isNavigationQuery(lastUserMessage)) {
      // For navigation queries, prioritize navigation content
      const navigationResults = await getNavigationHelp(lastUserMessage, 3);
      
      if (navigationResults.length > 0) {
        // Use navigation-specific results
        searchResults = navigationResults;
        navigationContext = "\nThis appears to be a navigation question. Here are specific instructions:";
      } else {
        // Fall back to regular search if no navigation content found
        searchResults = await searchEmbeddings(lastUserMessage, 5);
      }
    } else {
      // Regular search for non-navigation queries
      searchResults = await searchEmbeddings(lastUserMessage, 5);
    }
    
    // Organize context by category for better structure
    const contextByCategory: Record<string, string[]> = {};
    
    searchResults.forEach(result => {
      const category = result.metadata.category || 'general';
      if (!contextByCategory[category]) {
        contextByCategory[category] = [];
      }
      contextByCategory[category].push(result.text);
    });
    
    // Build structured context with categories
    let structuredContext = navigationContext;
    
    // Prioritize FAQ content if it exists
    if (contextByCategory['faqs']) {
      structuredContext += "\n\nFAQ Information:";
      contextByCategory['faqs'].forEach(text => {
        structuredContext += `\n${text}`;
      });
      // Remove to avoid duplication
      delete contextByCategory['faqs'];
    }
    
    // Add remaining categories
    Object.entries(contextByCategory).forEach(([category, texts]) => {
      structuredContext += `\n\n${category.charAt(0).toUpperCase() + category.slice(1)} Information:`;
      texts.forEach(text => {
        structuredContext += `\n${text}`;
      });
    });
    
    // Create a system message with the enhanced context
    const systemMessage: Message = {
      role: 'system',
      content: `You are a helpful assistant for a custom suit clothing website. 
      Answer questions based on the following context from our knowledge base.
      If the question cannot be answered with this context, be honest and suggest 
      contacting customer support.
      
      Context:
      ${structuredContext || "No specific information found for this query."}
      
      When discussing measurements, emphasize our AI measurement system that uses 
      full-body photos for 95% accuracy. For customization questions, refer to our 
      3D suit builder. Always be professional, concise, and helpful.
      
      If asked about taking measurements, provide step-by-step instructions 
      based on the information in our FAQs. Be specific about clicking on the
      account icon at the top right corner and following the prompts.`
    };
    
    // Add the system message to the beginning of the messages array
    const enhancedMessages: Message[] = [systemMessage, ...messages];
    
    // Send the enhanced messages to Groq
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: enhancedMessages,
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log("Received response from Groq API");
    
    const reply = response.data.choices[0].message;
    
    // Add source information and additional metadata to the response
    return NextResponse.json({ 
      reply,
      sources: searchResults.map(result => ({
        source: result.metadata.source,
        category: result.metadata.category,
        isNavigation: result.metadata.isNavigation
      }))
    });
  } catch (error) {
    // Properly type the error
    const axiosError = error as AxiosError;
    console.error('Groq API error:',
      axiosError.response?.data || axiosError.message || 'Unknown error');
    
    return NextResponse.json({
      error: 'Failed to get response from AI service'
    }, { status: 500 });
  }
}