// lib/embeddings/search.ts
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Define the embedding structure
interface EmbeddingChunk {
  text: string;
  embedding: number[];
  metadata: {
    category: string;
    source: string;
    isNavigation?: boolean;
    importance?: number;
    [key: string]: any;
  };
  similarity?: number;
}

interface EmbeddingsData {
  chunks: EmbeddingChunk[];
}

// Navigation-related keywords for query classification
const NAVIGATION_KEYWORDS = [
  'navigate', 'find', 'go to', 'where is', 'how do i get to',
  'location of', 'link to', 'menu', 'page for', 'section on',
  'where can i find', 'how to access', 'look for', 'searching for',
  'where should i click', 'how to get to', 'where', 'homepage',
  'measurements', 'measure', 'sizing', 'size', 'account icon'
];

// Function to generate embeddings using Groq
export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/embeddings',
      {
        model: 'llama3-embeddings',
        input: text
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw new Error('Failed to create embedding');
  }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magA * magB);
}

// Load embeddings from file
function loadEmbeddings(): EmbeddingChunk[] {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'embeddings', 'data', 'embeddings.json');
    // Try public folder as fallback
    const publicPath = path.join(process.cwd(), 'public', 'embeddings.json');
    
    let targetPath = fs.existsSync(filePath) ? filePath : publicPath;
    
    if (!fs.existsSync(targetPath)) {
      console.warn('Embeddings file not found at either location:', filePath, publicPath);
      return [];
    }
    
    const data = fs.readFileSync(targetPath, 'utf8');
    const parsedData = JSON.parse(data) as EmbeddingsData;
    return parsedData.chunks || [];
  } catch (error) {
    console.error('Error loading embeddings:', error);
    return [];
  }
}

// Check if a query is navigation-related
function isNavigationQuery(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  return NAVIGATION_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
}

// Search for relevant content based on query with context-aware improvements
export async function searchEmbeddings(query: string, topK: number = 5): Promise<EmbeddingChunk[]> {
  try {
    // Load embeddings
    const embeddings = loadEmbeddings();
    
    if (embeddings.length === 0) {
      console.warn('No embeddings found. Please generate embeddings first.');
      return [];
    }
    
    // Generate embedding for the query
    const queryEmbedding = await createEmbedding(query);
    
    // Check if this is a navigation query
    const isNavQuery = isNavigationQuery(query);
    
    // Calculate similarity for each embedding
    const embeddingsWithSimilarity = embeddings.map(item => {
      // Calculate base similarity
      const similarity = cosineSimilarity(queryEmbedding, item.embedding);
      
      // Apply context-aware boosting
      let adjustedSimilarity = similarity;
      
      // Boost navigation content for navigation queries
      if (isNavQuery && item.metadata.isNavigation) {
        adjustedSimilarity *= 1.5; // 50% boost for navigation content
      }
      
      // Apply importance score boost
      if (item.metadata.importance) {
        adjustedSimilarity *= (1 + item.metadata.importance / 10); // Subtle boost based on importance
      }
      
      return {
        ...item,
        similarity: adjustedSimilarity
      };
    });
    
    // Sort by adjusted similarity and take top K results
    return embeddingsWithSimilarity
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      .slice(0, topK);
  } catch (error) {
    console.error('Error searching embeddings:', error);
    return [];
  }
}

// Additional utility: Get most relevant navigation information
export async function getNavigationHelp(query: string, topK: number = 3): Promise<EmbeddingChunk[]> {
  try {
    // Load all embeddings
    const embeddings = loadEmbeddings();
    
    // Filter to only navigation-related content
    const navigationEmbeddings = embeddings.filter(item => item.metadata.isNavigation);
    
    if (navigationEmbeddings.length === 0) {
      console.warn('No navigation embeddings found.');
      return [];
    }
    
    // Generate embedding for the query
    const queryEmbedding = await createEmbedding(query);
    
    // Calculate similarity
    const embeddingsWithSimilarity = navigationEmbeddings.map(item => ({
      ...item,
      similarity: cosineSimilarity(queryEmbedding, item.embedding)
    }));
    
    // Return top K navigation results
    return embeddingsWithSimilarity
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      .slice(0, topK);
  } catch (error) {
    console.error('Error getting navigation help:', error);
    return [];
  }
}

// Helper function to extract main topics from embeddings
export function extractMainTopics(embeddings: EmbeddingChunk[]): string[] {
  // Get unique categories from embeddings
  const categories = new Set<string>();
  
  embeddings.forEach(item => {
    if (item.metadata.category) {
      categories.add(item.metadata.category);
    }
  });
  
  return Array.from(categories);
}