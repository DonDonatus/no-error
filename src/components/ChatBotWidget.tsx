"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  sender: "user" | "bot";
  text: string;
}

// This interface represents messages in the format Groq expects
interface GroqMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function WillowChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello I'm Willow.\nHow may I help you?" },
  ]);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Backend-controlled typing speed (ms per character)
  const typingSpeed = 20;

  const toggleOpen = () => setOpen((prev) => !prev);

  // Convert our UI messages to the format expected by Groq API
  const convertToGroqMessages = (messages: Message[]): GroqMessage[] => {
    return messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant", 
      content: msg.text
    }));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError(null);

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      setIsTyping(true);
      
      // Convert messages to Groq format and send all conversation history
      const groqMessages = convertToGroqMessages([...messages, userMsg]);
      
      // Add debugging log to verify messages are formatted correctly
      console.log("Sending messages to API:", groqMessages);
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: groqMessages }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to get response");
      }
      
      const data = await res.json();
      
      if (data.reply && data.reply.content) {
        simulateTyping(data.reply.content);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sorry, something went wrong.";
      setError(errorMessage);
      setIsTyping(false);
      simulateTyping("Sorry, I couldn't process your request. Please try again later.");
    }
  };

  const simulateTyping = (fullText: string) => {
    if (!fullText) return;
  
    setTypingMessage(""); // Start fresh
    let index = 0;
  
    const interval = setInterval(() => {
      setTypingMessage((prev) => (prev || "") + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { sender: "bot", text: fullText }]);
        setTypingMessage(null);
        setIsTyping(false);
      }
    }, typingSpeed);
  };
  
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typingMessage]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button onClick={toggleOpen}>
          <Image
            src="/images/willow.png"
            alt="Willow"
            width={60}
            height={60}
            className="rounded-full"
          />
        </button>
      )}

      {open && (
        <div className="w-80 bg-white rounded-xl shadow-lg border overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-b from-[#4767ac] via-[#8497db] to-[#081d59] p-4 text-white flex flex-col items-center relative">
            <img
              src="/images/willow.png"
              alt="Bot"
              className="w-16 h-16 mx-auto mt-4"
            />
            <span className="font-semibold text-lg">Willow</span>
            <button
              onClick={toggleOpen}
              className="absolute top-1 right-2 text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 max-h-[300px] overflow-y-auto p-3 space-y-4 bg-gray-50"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`message-container max-w-[75%]`}>
                  <div
                    className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                      msg.sender === "user" 
                        ? "bg-blue-200 rounded-tr-none" 
                        : "bg-gray-300 rounded-tl-none"
                    }`}
                    style={{
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      wordBreak: "break-word"
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {typingMessage !== null && (
              <div className="flex justify-start">
                <div className="message-container max-w-[75%]">
                  <div 
                    className="whitespace-pre-wrap rounded-2xl rounded-tl-none px-4 py-3 text-sm bg-gray-300"
                    style={{
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      wordBreak: "break-word"
                    }}
                  >
                    {typingMessage}
                  </div>
                </div>
              </div>
            )}

            {isTyping && typingMessage === null && (
              <div className="flex justify-start">
                <div className="message-container max-w-[75%]">
                  <div 
                    className="rounded-2xl rounded-tl-none px-4 py-3 text-sm bg-gray-300 font-mono animate-pulse"
                    style={{
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                    }}
                  >
                    Willow is typing<span className="dot-flash ml-1">...</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-xs mx-2">
                Error: {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative w-full border-t px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message here......."
              className="w-full pr-10 border rounded-full px-4 py-2 text-sm focus:outline-none"
              disabled={isTyping}
            />
            <img
              src="/icons/send.svg"
              alt="Send"
              onClick={sendMessage}
              className={`absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isTyping ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}