// scripts/generate-embeddings.ts
import { processFileToEmbeddings } from '../lib/embeddings/generate';
import fs from 'fs/promises';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content/chatbot');
const outputFile = path.join(process.cwd(), 'public/embeddings.json');

// Interface for embedding chunk
interface EmbeddingChunk {
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    category: string;
    [key: string]: any;
  };
}

// Function to recursively find markdown files
async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      const subFiles = await findMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function main() {
  try {
    console.log(`Starting embedding generation from ${contentDir}`);
    
    const files = await findMarkdownFiles(contentDir);
    console.log(`Found ${files.length} markdown files`);
    
    const allEmbeddings: EmbeddingChunk[] = [];
    
    for (const file of files) {
      console.log(`Processing ${file}...`);
      try {
        // Use processFileToEmbeddings instead of generateEmbeddings
        const fileEmbeddings = await processFileToEmbeddings(file);
        allEmbeddings.push(...fileEmbeddings);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error processing ${file}:`, error.message);
        } else {
          console.error(`Unknown error processing ${file}:`, error);
        }
      }
    }
    
    console.log(`Generated ${allEmbeddings.length} embeddings`);
    
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, JSON.stringify(allEmbeddings, null, 2));
    
    console.log(`Embeddings saved to ${outputFile}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error generating embeddings:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit(1);
  }
}

main();