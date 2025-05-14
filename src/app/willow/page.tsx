'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import { 
  Send, Loader2, Trash2, MoreVertical, X, ChevronDown, 
  Sparkles, Moon, Sun, MessageSquare, Settings, Volume2, VolumeX,
  Share2, User, Bot, Download, Copy, Check, ArrowUp, ChevronRight
} from 'lucide-react';

// Define message type for TypeScript
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  id: string;
  isRead?: boolean;
};

// Define theme type
type ThemeType = 'light' | 'dark' | 'midnight' | 'aurora';

export default function Home() {
  // Main state
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi! I am Willow. Welcome to UOMO MIGLIORE. How can I help you today?',
      timestamp: new Date(),
      id: 'welcome-msg',
      isRead: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // UI state
  const [theme, setTheme] = useState<ThemeType>('midnight');
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [messageHover, setMessageHover] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<{[key: string]: boolean}>({});
  
  // Content state
  const [suggestedPrompts, setSuggestedPrompts] = useState([
    "What are the best fashion choices for a summer wedding?",
    "Help me build a capsule wardrobe for business travel",
    "What are the top menswear trends this season?"
  ]);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      const scrollContainer = chatContainerRef.current;
      if (scrollContainer) {
        const isScrolledToBottom = 
          scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 150;
        
        if (isScrolledToBottom) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [messages, isLoading]);
  
  // Check if scroll button should be visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = chatContainerRef.current;
      if (scrollContainer) {
        const scrollHeight = scrollContainer.scrollHeight;
        const scrollTop = scrollContainer.scrollTop;
        const clientHeight = scrollContainer.clientHeight;
        
        // Show button if we're not near the bottom
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
      }
    };
    
    const scrollContainer = chatContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Keep focus on the input field
  useEffect(() => {
    if (!isLoading && !settingsOpen) {
      inputRef.current?.focus();
    }
  }, [isLoading, messages, settingsOpen]);

  // Auto resize textarea height based on content
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulate typing indicator for a more natural feel
  useEffect(() => {
    if (isLoading) {
      // Initial thinking time
      const thinkingDelay = Math.random() * 800 + 300;
      const thinkingTimer = setTimeout(() => setIsTyping(true), thinkingDelay);
      return () => clearTimeout(thinkingTimer);
    } else {
      setIsTyping(false);
    }
  }, [isLoading]);
  
  // Play sound effects
  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      if (messages.length > 1 && messages[messages.length - 1].role === 'assistant') {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play error:", e));
      }
    }
  }, [messages, audioEnabled]);
  
  // Reset copy success state after delay
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const generateMessageId = () => {
    return `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const sendMessage = async (customContent?: string) => {
    const messageToSend = customContent || input.trim();
    if ((!messageToSend) || isLoading) return;
    
    setError('');
    setIsLoading(true);
    setShowIntro(false);
    
    const userMessage: Message = { 
      role: 'user', 
      content: messageToSend,
      timestamp: new Date(),
      id: generateMessageId(),
      isRead: true
    };
    const newMessages = [...messages, userMessage];
    
    // Update messages UI immediately to show user input
    setMessages(newMessages);
    setInput('');
    
    try {
      // Simulate network delay for a more natural experience
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const response = await axios.post('/api/chat', { 
        messages: newMessages.map(({ role, content }) => ({ role, content }))
      });
      
      if (response.data.reply) {
        // Add the AI's response to messages with timestamp
        setMessages(prev => [
          ...prev, 
          {
            ...response.data.reply,
            timestamp: new Date(),
            id: generateMessageId(),
            isRead: false
          }
        ]);
        
        // Mark the message as read after a delay
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.role === 'assistant' && !msg.isRead 
                ? { ...msg, isRead: true } 
                : msg
            )
          );
        }, 1000);
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

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: 'Chat cleared. How can I help you today?',
        timestamp: new Date(),
        id: generateMessageId(),
        isRead: true
      }
    ]);
    setMenuOpen(false);
    setShowIntro(true);
    setExpandedMessages({});
  };

  const toggleTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setSettingsOpen(false);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const copyMessageToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopySuccess(id);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  const toggleExpandMessage = (id: string) => {
    setExpandedMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const shareChat = () => {
    // In a real implementation, this would generate a shareable link
    console.log("Sharing chat");
    setMenuOpen(false);
  };
  
  const exportChat = () => {
    // Create a text representation of the chat
    const chatText = messages
      .map(msg => `[${msg.role.toUpperCase()}] ${msg.timestamp?.toLocaleString()}\n${msg.content}\n`)
      .join('\n');
    
    // Create a downloadable blob
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uomo-migliore-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setMenuOpen(false);
  };

  // Get dynamic classes based on theme
  const getThemeClasses = useMemo(() => {
    if (theme === 'light') {
      return {
        main: 'bg-gradient-to-br from-slate-100 to-blue-50',
        header: 'bg-white/80 backdrop-blur-md border-slate-200',
        chatContainer: 'bg-white border-slate-200',
        userBubble: 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white',
        aiBubble: 'bg-slate-100 text-slate-800 border border-slate-200',
        inputArea: 'bg-white border-slate-200',
        inputText: 'text-slate-800 placeholder-slate-400',
        menuBg: 'bg-white border-slate-200',
        menuText: 'text-slate-800',
        logoText: 'text-slate-800',
        promptBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
        introBox: 'bg-white border-slate-200',
        scrollBtn: 'bg-slate-800 text-white',
        settingsPane: 'bg-white border-slate-200 text-slate-800',
        themeBtn: 'border-slate-300 hover:border-slate-400',
        activeThemeBtn: 'ring-2 ring-blue-500 border-transparent',
        messageControls: 'bg-slate-200/80 text-slate-600',
        statusBar: 'bg-slate-100 border-slate-200'
      };
    } else if (theme === 'dark') {
      return {
        main: 'bg-gradient-to-br from-slate-900 to-slate-800',
        header: 'bg-slate-900/90 backdrop-blur-md border-slate-700',
        chatContainer: 'bg-slate-800 border-slate-700',
        userBubble: 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white',
        aiBubble: 'bg-slate-700 text-slate-100 border border-slate-600',
        inputArea: 'bg-slate-700 border-slate-600',
        inputText: 'text-slate-100 placeholder-slate-400',
        menuBg: 'bg-slate-800 border-slate-700',
        menuText: 'text-slate-100',
        logoText: 'text-slate-100',
        promptBtn: 'bg-slate-700 hover:bg-slate-600 text-slate-200',
        introBox: 'bg-slate-800 border-slate-700',
        scrollBtn: 'bg-slate-100 text-slate-800',
        settingsPane: 'bg-slate-800 border-slate-700 text-slate-100',
        themeBtn: 'border-slate-600 hover:border-slate-500',
        activeThemeBtn: 'ring-2 ring-blue-500 border-transparent',
        messageControls: 'bg-slate-600/80 text-slate-200',
        statusBar: 'bg-slate-800 border-slate-700'
      };
    } else if (theme === 'midnight') {
      return {
        main: 'bg-gradient-to-br from-[#06084f] to-[#0c1485]',
        header: 'bg-[#030537]/80 backdrop-blur-md border-white/10',
        chatContainer: 'bg-white/5 border-white/10',
        userBubble: 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white',
        aiBubble: 'bg-white/10 backdrop-blur-sm text-white border border-white/20',
        inputArea: 'bg-white/10 border-white/20',
        inputText: 'text-white placeholder-white/50',
        menuBg: 'bg-[#0d1166] border-white/20',
        menuText: 'text-white',
        logoText: 'text-white',
        promptBtn: 'bg-white/10 hover:bg-white/20 text-white',
        introBox: 'bg-white/10 border-white/20',
        scrollBtn: 'bg-white text-[#0c1485]',
        settingsPane: 'bg-[#0d1166] border-white/20 text-white',
        themeBtn: 'border-white/30 hover:border-white/50',
        activeThemeBtn: 'ring-2 ring-blue-400 border-transparent',
        messageControls: 'bg-indigo-900/60 text-white/80',
        statusBar: 'bg-[#06084f] border-white/10'
      };
    } else { // aurora
      return {
        main: 'bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900',
        header: 'bg-purple-900/60 backdrop-blur-md border-purple-500/30',
        chatContainer: 'bg-gradient-to-br from-indigo-900/60 to-violet-900/60 backdrop-blur-sm border-purple-500/30',
        userBubble: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white',
        aiBubble: 'bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-md text-white border border-purple-500/40',
        inputArea: 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-md border-purple-500/30',
        inputText: 'text-white placeholder-white/50',
        menuBg: 'bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-md border-purple-500/30',
        menuText: 'text-white',
        logoText: 'text-white',
        promptBtn: 'bg-purple-800/50 hover:bg-purple-700/50 text-white',
        introBox: 'bg-gradient-to-br from-indigo-900/60 to-violet-900/60 backdrop-blur-sm border-purple-500/30',
        scrollBtn: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white',
        settingsPane: 'bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-md border-purple-500/30 text-white',
        themeBtn: 'border-purple-500/50 hover:border-purple-400/70',
        activeThemeBtn: 'ring-2 ring-pink-400 border-transparent',
        messageControls: 'bg-purple-900/60 text-white/80',
        statusBar: 'bg-purple-900/80 border-purple-500/30'
      };
    }
  }, [theme]);

  return (
    <main className={`min-h-screen ${getThemeClasses.main} flex flex-col transition-colors duration-500`}>
      {/* Audio element for notification sounds */}
      <audio ref={audioRef} className="hidden">
        <source src="/api/placeholder/message-sound" type="audio/mp3" />
      </audio>
      
      {/* Elegant header */}
      <header className={`py-4 px-6 flex items-center justify-between ${`themeClasses.header`}border-b transition-all duration-500 sticky top-0 z-10`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-40"></div>
            <MessageSquare className={`${getThemeClasses.logoText} relative h-6 w-6`} />
          </div>
          <h1 className={`text-xl font-bold ${getThemeClasses.logoText} tracking-tight transition-colors duration-300`}>
            UOMO <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">MIGLIORE</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSettingsOpen(prev => !prev)}
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${getThemeClasses.logoText}`}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${getThemeClasses.logoText}`}
              aria-label="Menu"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {menuOpen && (
              <div className={`absolute right-0 mt-2 w-56 ${getThemeClasses.menuBg} rounded-lg shadow-xl border overflow-hidden z-20 animate-fadeIn`}>
                <div className="py-1">
                  
                  
                  <button 
                    onClick={shareChat}
                    className={`${getThemeClasses.menuText} flex w-full items-center px-4 py-3 text-sm hover:bg-white/10 transition-colors`}
                  >
                    <Share2 className="mr-3 h-4 w-4" />
                    <span>Share Chat</span>
                  </button>
                  
                  <button 
                    onClick={exportChat}
                    className={`${getThemeClasses.menuText} flex w-full items-center px-4 py-3 text-sm hover:bg-white/10 transition-colors`}
                  >
                    <Download className="mr-3 h-4 w-4" />
                    <span>Export Chat</span>
                  </button>
                  
                  <button 
                    onClick={clearChat}
                    className={`${getThemeClasses.menuText} flex w-full items-center px-4 py-3 text-sm hover:bg-white/10 transition-colors border-t border-white/10`}
                  >
                    <Trash2 className="mr-3 h-4 w-4" />
                    <span>Clear Chat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Settings Panel */}
        {settingsOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center animate-fadeIn" onClick={() => setSettingsOpen(false)}>
            <div 
              ref={settingsRef} 
              onClick={e => e.stopPropagation()}
              className={`${getThemeClasses.settingsPane} w-full max-w-md rounded-xl shadow-2xl border p-6 animate-scaleIn`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Settings</h2>
                <button onClick={() => setSettingsOpen(false)} className="p-1 rounded-full hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => toggleTheme('midnight')}
                      className={`p-4 rounded-lg border ${getThemeClasses.themeBtn} transition-all ${theme === 'midnight' ? getThemeClasses.activeThemeBtn : ''}`}
                    >
                      <div className="h-12 rounded-md bg-gradient-to-br from-[#06084f] to-[#0c1485] mb-2"></div>
                      <span>Midnight</span>
                    </button>
                    <button 
                      onClick={() => toggleTheme('aurora')}
                      className={`p-4 rounded-lg border ${getThemeClasses.themeBtn} transition-all ${theme === 'aurora' ? getThemeClasses.activeThemeBtn : ''}`}
                    >
                      <div className="h-12 rounded-md bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 mb-2"></div>
                      <span>Aurora</span>
                    </button>
                    <button 
                      onClick={() => toggleTheme('dark')}
                      className={`p-4 rounded-lg border ${getThemeClasses.themeBtn} transition-all ${theme === 'dark' ? getThemeClasses.activeThemeBtn : ''}`}
                    >
                      <div className="h-12 rounded-md bg-gradient-to-br from-slate-900 to-slate-800 mb-2"></div>
                      <span>Dark</span>
                    </button>
                    <button 
                      onClick={() => toggleTheme('light')}
                      className={`p-4 rounded-lg border ${getThemeClasses.themeBtn} transition-all ${theme === 'light' ? getThemeClasses.activeThemeBtn : ''}`}
                    >
                      <div className="h-12 rounded-md bg-gradient-to-br from-slate-100 to-blue-50 mb-2"></div>
                      <span>Light</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Sound</h3>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${getThemeClasses.themeBtn} transition-all`}
                    >
                      {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                      <span>{audioEnabled ? 'Sound On' : 'Sound Off'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Chat container */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
        <div 
          ref={chatContainerRef}
          className={`flex-1 overflow-y-auto mb-4 rounded-xl ${getThemeClasses.chatContainer} shadow-xl border transition-all duration-500 backdrop-blur-sm`}
        >
          {showIntro && (
            <div className={`m-4 p-6 rounded-xl ${getThemeClasses.introBox} border shadow-md backdrop-blur-sm transition-all duration-500`}>
              <div className="flex items-center justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30"></div>
                  <Sparkles className={`relative ${getThemeClasses.logoText} mr-2 h-6 w-6`} />
                </div>
                <h2 className={`text-xl font-medium ${getThemeClasses.logoText}`}>Welcome to UOMO MIGLIORE</h2>
              </div>
              <p className={`text-sm mb-8 ${getThemeClasses.logoText} text-center opacity-80 max-w-md mx-auto`}>
                Your personal fashion advisor. I'll help you refine your style, 
                find the perfect outfit, and stay on trend.
              </p>
              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className={`${getThemeClasses.promptBtn} text-sm py-3 px-4 rounded-lg text-left transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between`}
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4 space-y-6">
            {messages.map((message, index) => {
              const isLongMessage = message.content.length > 500;
              const isExpanded = expandedMessages[message.id] || !isLongMessage;
              const displayContent = isExpanded 
                ? message.content 
                : `${message.content.substring(0, 350)}...`;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                  onMouseEnter={() => setMessageHover(message.id)}
                  onMouseLeave={() => setMessageHover(null)}
                >
                  <div className="relative group max-w-[85%]">
                    <div 
                      className={`relative p-4 rounded-2xl shadow-md ${
                        message.role === 'user' 
                          ? getThemeClasses.userBubble
                          : getThemeClasses.aiBubble
                      } transition-all duration-500`}
                    >
                      <div className="flex items-center gap-2 mb-1.5 opacity-70">
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === 'user' ? 'You' : 'Willow'}
                        </span>
                        {message.timestamp && (
                          <span className="text-xs">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        )}
                        {message.role === 'assistant' && !message.isRead && (
                          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      
                      <div className="whitespace-pre-wrap">{displayContent}</div>
                      
                      {isLongMessage && (
                        <button 
                        onClick={() => toggleExpandMessage(message.id)}
                        className="mt-2 text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                        >
                          {expandedMessages[message.id] ? (
                            <>
                              <ChevronDown className="h-3 w-3" />
                              <span>Show less</span>
                            </>
                          ) : (
                            <>
                              <ChevronRight className="h-3 w-3" />
                              <span>Read more</span>
                            </>
                          )}
                        </button>
                        )}
                                              
                        {/* Message controls that appear on hover */}
                        {messageHover === message.id && (
                          <div 
                            className={`absolute -top-8 right-0 py-1 px-2 rounded-md ${getThemeClasses.messageControls} flex items-center gap-2 animate-fadeIn z-10`}
                          >
                            <button 
                              onClick={() => copyMessageToClipboard(message.content, message.id)}
                              className="p-1 rounded hover:bg-white/20 transition-colors"
                              aria-label="Copy message"
                            >
                              {copySuccess === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                        )}
                        </div>
                        </div>
                        </div>
                        );
                        })}
                                    
                        {isTyping && (
                          <div className="flex justify-start animate-fadeIn">
                            <div className={`p-4 rounded-2xl shadow-md ${getThemeClasses.aiBubble} transition-all duration-500 max-w-[85%]`}>
                              <div className="flex items-center gap-2 mb-1.5 opacity-70">
                                <Bot className="h-4 w-4" />
                                <span className="text-xs font-medium">Willow</span>
                              </div>
                              <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                              </div>
                            </div>
                          </div>
                        )}
                                    
                        <div ref={messagesEndRef} />
                        </div>
                        </div>
                        
                        {/* Scroll to bottom button */}
                        {showScrollButton && (
                          <button 
                            onClick={scrollToBottom}
                            className={`fixed bottom-24 right-8 p-2 rounded-full shadow-lg ${getThemeClasses.scrollBtn} transition-all hover:scale-110 animate-fadeIn`}
                            aria-label="Scroll to bottom"
                          >
                            <ArrowUp className="h-5 w-5" />
                          </button>
                        )}
                        
                        {/* Input area */}
                        <div className={`${getThemeClasses.inputArea} p-4 rounded-xl shadow-xl border transition-all duration-500 backdrop-blur-sm`}>
                          {error && (
                            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-fadeIn">
                              <p>{error}</p>
                            </div>
                          )}
                          
                          <div className="relative">
                            <textarea
                              ref={inputRef}
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Ask about fashion, style advice, outfit suggestions..."
                              className={`w-full px-4 py-3 rounded-lg resize-none ${getThemeClasses.inputText} bg-transparent border-0 focus:ring-0 focus:outline-none`}
                              rows={1}
                              disabled={isLoading}
                            />
                            
                            <button
                              onClick={() => sendMessage()}
                              disabled={!input.trim() || isLoading}
                              className={`absolute right-2 bottom-2 p-2 rounded-full ${
                                input.trim() && !isLoading
                                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                  : 'bg-white/10 text-white/40'
                              } transition-all hover:scale-110 active:scale-95 disabled:hover:scale-100`}
                              aria-label="Send message"
                            >
                              {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Send className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Status bar */}
                        <div className={`mt-2 p-2 text-xs text-center rounded-md ${getThemeClasses.statusBar} opacity-70 border transition-all duration-500`}>
                         WILLOW • Fashion AI Assistant • © 2025
                        </div>
                        </div>
                        </main>
                        );
                        }