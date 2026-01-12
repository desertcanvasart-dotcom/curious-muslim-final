"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Shield,
  BookOpen,
  RefreshCw,
  Maximize2,
  Minimize2,
  X,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  MessageSquare,
  Trash2,
  History,
} from "lucide-react";

// ============================================
// TYPES - Ready for database integration
// ============================================
interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: "positive" | "negative" | null;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

interface KnowledgeBase {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  category: string;
  relatedQuestions: string[];
}

// ============================================
// DUMMY DATA - Will be replaced by database
// ============================================
const knowledgeBase: KnowledgeBase[] = [
  {
    id: "1",
    question: "Who was Prophet Muhammad?",
    keywords: ["who", "prophet", "muhammad", "messenger"],
    answer: "Prophet Muhammad (peace be upon him) was the last messenger of Allah, sent to guide all of humanity. He was born in Makkah around 570 CE and is known for his kindness, honesty, and wisdom. Muslims love him dearly and try to follow his beautiful example in everything they do.\n\nHe was an orphan who grew up to become a successful merchant, known as 'Al-Amin' (The Trustworthy). At the age of 40, he received the first revelation from Allah through Angel Jibreel in the Cave of Hira.\n\nWould you like to know more about his early life or his teachings?",
    category: "biography",
    relatedQuestions: ["What was his childhood like?", "Why is he called Al-Amin?"],
  },
  {
    id: "2",
    question: "Why is the Prophet called Al-Amin?",
    keywords: ["al-amin", "trustworthy", "honest", "nickname"],
    answer: "Even before he became a Prophet, Muhammad was known as 'Al-Amin' which means 'The Trustworthy One'! 🌟\n\nPeople in Makkah would trust him with their valuables because he never lied or cheated. When tribes had disputes, they would ask him to help solve them because everyone knew he was fair and honest.\n\nThis shows us how important honesty is - the Prophet was honest his whole life, even before he received the message from Allah. Isn't it wonderful that being truthful was part of who he was?\n\n**Fun fact:** Even his enemies trusted him with their belongings!",
    category: "character",
    relatedQuestions: ["What other names did he have?", "How can I be more honest?"],
  },
  {
    id: "3",
    question: "What happened in the Cave of Hira?",
    keywords: ["cave", "hira", "revelation", "jibreel", "gabriel", "first"],
    answer: "The Cave of Hira is a very special place in Islamic history! 🏔️\n\nThe Prophet Muhammad used to go there to think, reflect, and pray. He would spend days in peaceful contemplation away from the busy city of Makkah.\n\nOne night, when he was 40 years old, something amazing happened:\n\n1. The Angel Jibreel (Gabriel) appeared to him\n2. Jibreel said 'Iqra!' (Read!)\n3. The Prophet said he couldn't read\n4. This happened three times\n5. Then Jibreel revealed the first verses of the Quran\n\nThe first words revealed were: *'Read in the name of your Lord who created.'* (Surah Al-Alaq)\n\nThis was the beginning of Islam! The Prophet was chosen by Allah to share His final message with the whole world.",
    category: "events",
    relatedQuestions: ["What is Surah Al-Alaq about?", "How did the Prophet feel?"],
  },
  {
    id: "4",
    question: "Tell me about the Night Journey",
    keywords: ["night", "journey", "isra", "miraj", "jerusalem", "heaven"],
    answer: "The Night Journey, called 'Isra and Mi'raj', is one of the most amazing miracles in Islam! ✨\n\n**Part 1: Al-Isra (The Night Journey)**\nOne night, Angel Jibreel came to Prophet Muhammad with a special creature called Buraq. Together, they traveled from Makkah to Jerusalem in an instant!\n\n**Part 2: Al-Mi'raj (The Ascension)**\nFrom Jerusalem, the Prophet ascended through the seven heavens:\n- He met Prophet Adam in the 1st heaven\n- He met Prophet Isa (Jesus) and Yahya in the 2nd heaven\n- He met Prophet Yusuf in the 3rd heaven\n- He met Prophet Idris in the 4th heaven\n- He met Prophet Harun in the 5th heaven\n- He met Prophet Musa in the 6th heaven\n- He met Prophet Ibrahim in the 7th heaven\n\nFinally, he went beyond to meet Allah! This is when Muslims were given the gift of **five daily prayers**.\n\n🌙 This journey happened in just one night!",
    category: "miracles",
    relatedQuestions: ["What is Buraq?", "Why do we pray 5 times a day?"],
  },
  {
    id: "5",
    question: "How did the Prophet treat children?",
    keywords: ["children", "kids", "kind", "play", "grandchildren"],
    answer: "Prophet Muhammad loved children SO much! His treatment of children teaches us beautiful lessons. 💝\n\n**He played with them:**\n- He would let his grandchildren Hassan and Hussain ride on his back\n- He would race with children and sometimes let them win\n- He made funny faces to make babies laugh\n\n**He was patient with them:**\n- When praying, if a child climbed on him, he would make his prayer longer so they could play\n- He never scolded children harshly\n\n**He respected them:**\n- He would greet children with 'Assalamu Alaikum'\n- He asked children for their opinions\n- He kept his promises to them\n\n**He said:**\n> *'Whoever does not show mercy to children... is not one of us.'*\n\nThe Prophet teaches us that children are a blessing from Allah, and we should always be gentle and loving with them!",
    category: "character",
    relatedQuestions: ["Did the Prophet have children?", "What did he teach about family?"],
  },
  {
    id: "6",
    question: "What is the Seerah?",
    keywords: ["seerah", "biography", "life", "story", "history"],
    answer: "The Seerah is the biography of Prophet Muhammad - the complete story of his life! 📚\n\n**What does Seerah include?**\n- His birth and childhood\n- His life before prophethood\n- The revelation and early Islam\n- The struggles in Makkah\n- The migration to Madinah (Hijrah)\n- Building the Muslim community\n- Important events and battles\n- His character and daily life\n- His final sermon and passing\n\n**Why is it important?**\n1. It helps us understand the Quran better\n2. We learn how to apply Islam in our lives\n3. We get to know and love our Prophet\n4. It contains timeless lessons\n\n**Did you know?** That's exactly what our book 'Stories of the Prophets' teaches in a fun, kid-friendly way! 🌟",
    category: "education",
    relatedQuestions: ["Where can I learn more?", "What are the best Seerah books for kids?"],
  },
  {
    id: "7",
    question: "What was the Prophet's childhood like?",
    keywords: ["childhood", "young", "orphan", "halimah", "mother", "father"],
    answer: "Prophet Muhammad had a unique and sometimes difficult childhood, but Allah was always protecting him. 🌙\n\n**Before Birth:**\nHis father Abdullah passed away before he was born.\n\n**Early Years:**\n- Born in Makkah in the Year of the Elephant (570 CE)\n- As was the custom, he was sent to live with Halimah Sa'diyah in the desert\n- She was his wet nurse and loved him dearly\n- Living in the desert helped him grow strong and learn pure Arabic\n\n**Loss and Love:**\n- His mother Aminah passed away when he was 6 years old\n- His grandfather Abdul Muttalib took care of him\n- When his grandfather died, his uncle Abu Talib raised him\n\n**Growing Up:**\n- He worked as a shepherd\n- He never worshipped idols like others in Makkah\n- He was known for being honest and kind\n- Everyone called him 'Al-Amin' (The Trustworthy)\n\nEven though he faced hardships, Allah was preparing him to become the greatest messenger! 💫",
    category: "biography",
    relatedQuestions: ["Who was Halimah?", "What is the Year of the Elephant?"],
  },
];

const suggestedQuestions = [
  "Who was Prophet Muhammad?",
  "Why is the Prophet called Al-Amin?",
  "What happened in the Cave of Hira?",
  "Tell me about the Night Journey",
  "How did the Prophet treat children?",
  "What is the Seerah?",
];

// Dummy conversation history for database simulation
const dummyConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "Learning about the Prophet",
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    messages: [],
  },
  {
    id: "conv-2",
    title: "The Night Journey",
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    messages: [],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function findBestAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase().trim();

  // Check knowledge base for matching keywords
  for (const entry of knowledgeBase) {
    const matchScore = entry.keywords.filter(keyword =>
      lowerQuestion.includes(keyword.toLowerCase())
    ).length;

    if (matchScore >= 2 || entry.keywords.some(k => lowerQuestion.includes(k))) {
      return entry.answer;
    }
  }

  // Check for greetings
  if (
    lowerQuestion.includes("hello") ||
    lowerQuestion.includes("hi") ||
    lowerQuestion.includes("salam") ||
    lowerQuestion.includes("assalam")
  ) {
    return "Wa alaikum assalam! 🌟\n\nIt's wonderful to meet you! I'm Noor, and I love helping young Muslims learn about our beloved Prophet Muhammad (peace be upon him).\n\nWhat would you like to know about his life? You can ask me about:\n- His childhood and family\n- The Cave of Hira\n- The Night Journey\n- How he treated others\n- And much more!";
  }

  // Check for thank you
  if (lowerQuestion.includes("thank")) {
    return "You're very welcome! 😊\n\nI love helping you learn about our beloved Prophet. Remember, every question brings you closer to understanding his beautiful example.\n\nDo you have any other questions? I'm here to help!";
  }

  // Default response
  return `That's a wonderful question! 🤔\n\nI'm still learning and growing my knowledge. While I might not have a complete answer for "${question}" right now, here are some things you could try:\n\n1. Ask me about the Prophet's childhood\n2. Learn about the Cave of Hira\n3. Discover the Night Journey\n4. Explore how the Prophet treated children\n\nOr check out our book "Stories of the Prophets" for beautifully illustrated stories! 📚`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AskNoorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      conversationId: "current",
      role: "assistant",
      content: "Assalamu alaikum! 🌟\n\nI'm **Noor**, your friendly guide to learning about Prophet Muhammad (peace be upon him).\n\nI'm here to help answer your questions about:\n- The Prophet's life and character\n- Important events in Islamic history\n- The Seerah (his biography)\n- And much more!\n\nWhat would you like to learn about today?",
      timestamp: new Date(),
      feedback: null,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isFullscreen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFullscreen]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: generateId(),
      conversationId: "current",
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      feedback: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const response = findBestAnswer(inputValue);
      const assistantMessage: Message = {
        id: generateId(),
        conversationId: "current",
        role: "assistant",
        content: response,
        timestamp: new Date(),
        feedback: null,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
  };

  const handleCopy = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        conversationId: "current",
        role: "assistant",
        content: "Assalamu alaikum! 🌟\n\nI'm **Noor**, your friendly guide to learning about Prophet Muhammad (peace be upon him).\n\nWhat would you like to learn about today?",
        timestamp: new Date(),
        feedback: null,
      },
    ]);
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================
  const renderMessage = (message: Message) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
      >
        <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 ${isUser ? "hidden" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C94C] to-[#E0B63A] flex items-center justify-center shadow-md">
              <span className="text-lg">🌟</span>
            </div>
          </div>

          {/* Message Content */}
          <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
            {!isUser && (
              <span className="text-xs font-semibold text-[#3D5A6C] mb-1 ml-1">Noor</span>
            )}

            <div
              className={`rounded-2xl px-4 py-3 ${
                isUser
                  ? "bg-gradient-to-br from-[#3D5A6C] to-[#4A6B7C] text-white rounded-tr-sm"
                  : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content.split('\n').map((line, i) => {
                  // Handle bold text
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j}>{part.slice(2, -2)}</strong>;
                        }
                        // Handle italic text
                        if (part.startsWith('*') && part.endsWith('*')) {
                          return <em key={j}>{part.slice(1, -1)}</em>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Message Actions */}
            <div className={`flex items-center gap-2 mt-1 ${isUser ? "mr-1" : "ml-1"}`}>
              <span className="text-xs text-gray-400">
                {formatTime(message.timestamp)}
              </span>

              {!isUser && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Copy"
                  >
                    {copiedId === message.id ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, "positive")}
                    className={`p-1 hover:bg-gray-100 rounded transition-colors ${
                      message.feedback === "positive" ? "text-green-500" : "text-gray-400"
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, "negative")}
                    className={`p-1 hover:bg-gray-100 rounded transition-colors ${
                      message.feedback === "negative" ? "text-red-500" : "text-gray-400"
                    }`}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderChatInterface = (fullscreen: boolean = false) => (
    <div className={`flex flex-col ${fullscreen ? "h-full" : "h-[600px]"} bg-[#FAFAFA] rounded-2xl overflow-hidden border border-gray-200 shadow-lg`}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F2C94C] rounded-full flex items-center justify-center shadow-md">
            <span className="text-xl">🌟</span>
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              Ask Noor
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </h3>
            <p className="text-xs text-white/70">
              {isTyping ? "Typing..." : "Your AI Guide to the Seerah"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            title="Chat History"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={resetChat}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            title="New Chat"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          {fullscreen ? (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
              title="Fullscreen Mode"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-gray-200 bg-white overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <h4 className="font-semibold text-[#3D5A6C] text-sm">Recent Chats</h4>
              </div>
              <div className="p-2 space-y-1">
                {dummyConversations.map((conv) => (
                  <button
                    key={conv.id}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {conv.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conv.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-all">
                        <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map(renderMessage)}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C94C] to-[#E0B63A] flex items-center justify-center shadow-md">
                    <span className="text-lg">🌟</span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <motion.span
                        className="w-2 h-2 bg-[#3D5A6C] rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[#3D5A6C] rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[#3D5A6C] rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-[#F2C94C]" />
                <span className="text-xs font-medium text-gray-500">Try asking:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 4).map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-[#F2C94C]/10 hover:border-[#F2C94C] transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Noor anything about the Prophet..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3D5A6C]/20 focus:border-[#3D5A6C] bg-gray-50 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-5 py-3 bg-gradient-to-r from-[#3D5A6C] to-[#5C7A4B] hover:from-[#2C4555] hover:to-[#4A6A3B] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // FULLSCREEN MODE
  // ============================================
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FDFBF7]">
        <div className="h-full max-w-5xl mx-auto p-4">
          {renderChatInterface(true)}
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Bot className="w-4 h-4" />
              <span>AI-Powered Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Ask Noor
            </h1>

            <p className="text-xl text-white leading-relaxed mb-6">
              Your friendly AI guide to learning about Prophet Muhammad.
              Ask anything about the Seerah!
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-[#F2C94C]" />
                <span>Safe for Kids</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4 text-[#F2C94C]" />
                <span>Authentic Sources</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-[#F2C94C]" />
                <span>Interactive Learning</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {renderChatInterface()}
            </motion.div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <motion.div
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-10 h-10 bg-[#F2C94C]/20 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-[#F2C94C]" />
                </div>
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-2">Ask Anything</h3>
                <p className="text-sm text-gray-600">
                  No question is too simple. Noor explains things in a way kids can understand.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-10 h-10 bg-[#5C7A4B]/20 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-[#5C7A4B]" />
                </div>
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-2">Safe & Appropriate</h3>
                <p className="text-sm text-gray-600">
                  All content is age-appropriate and aligned with Islamic values.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 bg-[#3D5A6C]/20 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-[#3D5A6C]" />
                </div>
                <h3 className="font-heading font-bold text-[#3D5A6C] mb-2">Book Companion</h3>
                <p className="text-sm text-gray-600">
                  Perfect companion to our &quot;Stories of the Prophets&quot; book.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#3D5A6C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2C4555] transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Get the Book for Full Experience
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
