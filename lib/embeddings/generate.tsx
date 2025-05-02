// lib/embeddings/generate.ts
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

// Define interface types to fix type errors
interface ChunkMetadata {
  source: string;
  category: string;
  isNavigation?: boolean;  // Flag for navigation-related content
  importance?: number;     // Importance score for prioritization
  [key: string]: any;
}

interface EmbeddingChunk {
  text: string;
  embedding: number[];
  metadata: ChunkMetadata;
}

interface ProcessedEmbeddings {
  chunks: EmbeddingChunk[];
}

// Function to generate embedding using Groq API
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

// Split text into chunks
function splitTextIntoChunks(text: string, size: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = [];
  let currentIndex = 0;
 
  while (currentIndex < text.length) {
    const endIndex = Math.min(currentIndex + size, text.length);
    chunks.push(text.slice(currentIndex, endIndex));
    currentIndex = endIndex - overlap;
   
    if (currentIndex >= text.length - overlap) {
      break;
    }
  }
 
  return chunks;
}

// Check if content is navigation-related
function isNavigationContent(content: string, metadata: Record<string, any>): boolean {
  const navigationKeywords = [
    'navigation', 'menu', 'sitemap', 'find', 'locate', 'page', 
    'link', 'go to', 'visit', 'browse', 'section', 'homepage',
    'header', 'footer', 'sidebar', 'navbar', 'route', 'path',
    'measurements', 'measure', 'sizing', 'size', 'account icon'
  ];
  
  // Check if the file path contains navigation indicators
  const isNavigationPath = metadata.source?.toLowerCase().includes('nav') || 
                          metadata.source?.toLowerCase().includes('menu') ||
                          metadata.source?.toLowerCase().includes('sitemap');
  
  // Check if content has navigation keywords
  const hasNavigationKeywords = navigationKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
  
  // Check if there are explicit navigation tags in front matter
  const hasNavigationTag = metadata.tags?.includes('navigation') || 
                          metadata.type === 'navigation' ||
                          metadata.category === 'navigation';
  
  return isNavigationPath || hasNavigationKeywords || hasNavigationTag;
}

// Calculate importance score for content
function calculateImportance(content: string, metadata: Record<string, any>): number {
  let score = 1; // Base score
  
  // Increase score for navigation content
  if (isNavigationContent(content, metadata)) {
    score += 2;
  }
  
  // Increase score for content in important categories
  const importantCategories = ['faq', 'help', 'guide', 'tutorial'];
  if (importantCategories.includes(metadata.category?.toLowerCase())) {
    score += 1;
  }
  
  // Increase score for content with detailed information
  if (content.length > 500) {
    score += 0.5;
  }
  
  return score;
}

// Process a single markdown file to chunks with embeddings
export async function processFileToEmbeddings(filePath: string): Promise<EmbeddingChunk[]> {
  try {
    // Read file content
    const content = await fs.readFile(filePath, 'utf8');
   
    // Parse front matter manually instead of using gray-matter
    let parsedContent = content;
    const metadata: Record<string, any> = {};
   
    // Simple front matter parsing
    if (content.startsWith('---')) {
      const endOfFrontMatter = content.indexOf('---', 3);
      if (endOfFrontMatter !== -1) {
        const frontMatter = content.slice(3, endOfFrontMatter).trim();
        frontMatter.split('\n').forEach(line => {
          const [key, value] = line.split(':').map(part => part.trim());
          if (key && value) {
            metadata[key] = value;
          }
        });
        parsedContent = content.slice(endOfFrontMatter + 3).trim();
      }
    }
   
    // Extract category from filepath
    const relativePath = filePath.replace(/^\.\/content\/chatbot\//, '');
    const category = relativePath.includes('/') ? relativePath.split('/')[0] : 'general, navigation, technical';
   
    // Split into chunks
    const chunks = splitTextIntoChunks(parsedContent);
   
    // Generate embeddings for each chunk
    const embeddingsPromises = chunks.map(async (chunk) => {
      const embedding = await createEmbedding(chunk);
      
      // Check if this is navigation content
      const isNavigation = isNavigationContent(chunk, { ...metadata, source: relativePath, category });
      
      // Calculate importance score
      const importance = calculateImportance(chunk, { ...metadata, source: relativePath, category });

      
     
      return {
        text: chunk,
        embedding,
        metadata: {
          source: relativePath,
          category,
          isNavigation,
          importance,
          ...metadata
        }
      };
    });
   
    return Promise.all(embeddingsPromises);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return [];
  }
}

// Recursively get all markdown files from a directory
async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    const files = await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other non-content directories if needed
        if (entry.name === 'node_modules' || entry.name === 'public') {
          return [];
        }
        return getAllMarkdownFiles(fullPath);
      } else if (entry.name.endsWith('.md')) {
        return [fullPath];
      }
      return [];
    }));
    
    return files.flat();
  } catch (error) {
    console.error(`Error getting markdown files from ${dir}:`, error);
    return [];
  }
}

// Process all markdown files in the content directory
export async function generateAllEmbeddings(): Promise<ProcessedEmbeddings> {
  try {
    console.log('Starting to generate embeddings for all content...');
    
    // Get all markdown files from the content directory
    const contentDir = './content/chatbot';
    const markdownFiles = await getAllMarkdownFiles(contentDir);
    
    console.log(`Found ${markdownFiles.length} markdown files to process`);
    
    // Process each file and collect all embeddings
    const allChunks: EmbeddingChunk[] = [];
    
    for (const filePath of markdownFiles) {
      console.log(`Processing ${filePath}...`);
      const fileEmbeddings = await processFileToEmbeddings(filePath);
      allChunks.push(...fileEmbeddings);
      console.log(`Generated ${fileEmbeddings.length} embeddings for ${filePath}`);
    }
    
    // Save these embeddings to a file
    await saveEmbeddingsToFile({ chunks: allChunks });
    
    console.log('Finished generating all embeddings!');
    return { chunks: allChunks };
  } catch (error) {
    console.error('Error generating all embeddings:', error);
    throw error;
  }
}

// Save embeddings to a file
async function saveEmbeddingsToFile(embeddings: ProcessedEmbeddings): Promise<void> {
  // Create embeddings directory if it doesn't exist
  const embeddingsDir = './lib/embeddings/data';
  try {
    await fs.mkdir(embeddingsDir, { recursive: true });
  } catch (err) {
    // Directory already exists or other error
  }
  
  // Save embeddings to a JSON file
  const outputPath = path.join(embeddingsDir, 'embeddings.json');
  await fs.writeFile(outputPath, JSON.stringify(embeddings, null, 2), 'utf8');
  console.log(`Embeddings saved to ${outputPath}`);
  
  // Also save a copy to public folder for easy access by the frontend
  const publicPath = path.join(process.cwd(), 'public', 'embeddings.json');
  await fs.writeFile(publicPath, JSON.stringify(embeddings, null, 2), 'utf8');
  console.log(`Embeddings also saved to ${publicPath}`);
}

// For backward compatibility
export const createGroqEmbedding = createEmbedding;
export const generateEmbeddings = processFileToEmbeddings;

// Execute the process if this file is run directly
if (require.main === module) {
  generateAllEmbeddings()
    .then(() => console.log('Process completed successfully'))
    .catch((err) => console.error('Process failed:', err));
}