'use client';

import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Define message type for TypeScript
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am Willow. Welcome to UOMO MIGLIORE. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Refs for scrolling and input focus
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  // Keep focus on the input field
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading, messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    setError('');
    setIsLoading(true);
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    // Update messages UI immediately to show user input
    setMessages(newMessages);
    setInput('');
    
    try {
      const response = await axios.post('/api/chat', { 
        messages: newMessages 
      });
      
      if (response.data.reply) {
        // Add the AI's response to messages
        setMessages(prev => [...prev, response.data.reply]);
      } else if (response.data.error) {
        setError(response.data.error);
      } else {
        setError('Received invalid response format');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error sending message:', axiosError);
      
      if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
        const errorData = axiosError.response.data as { error?: string };
        setError(errorData.error || 'Failed to send message. Please try again.');
      } else {
        setError('Failed to send message. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto h-screen flex flex-col rounded-lg bg-[#08106c]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ffffff]">Chat with AI</h1>
      
      <div className="flex-1 overflow-y-auto mb-6 pr-2 rounded-lg bg-white shadow-md p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-sm max-w-[85%] ${
                message.role === 'user' 
                  ? 'bg-[#08106c] text-white ml-auto border-l-4 border-[#b5b5b5]' 
                  : 'bg-gray-100 border-l-4 border-[#08106c]'
              }`}
            >
              <div className={`font-bold mb-1 ${message.role === 'user' ? 'text-white-100' : 'text-[#08106c]'}`}>
                {message.role === 'user' ? 'You' : 'AI Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}
          
          {isLoading && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm border-l-4 border-[#08106c] max-w-[85%]">
              <div className="font-bold mb-1 text-[#08106c]">AI Assistant</div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 rounded-lg text-red-700 border border-red-300 shadow-sm max-w-[85%]">
              <div className="font-bold">Error</div>
              <div>{error}</div>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex gap-3 bg-white p-4 rounded-lg shadow-md">
        <textarea
          ref={inputRef}
          className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#08106c] focus:border-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={3}
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className={`px-6 py-2 rounded-lg self-end font-medium ${
            isLoading || !input.trim()
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-[#08106c] hover:bg-blue-700 active:bg-blue-800'
          } text-white transition-colors duration-200`}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </main>
  );
}