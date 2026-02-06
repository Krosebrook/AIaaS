import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageSquare, X, Send, Loader2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the INTinc AI assistant. How can I help you with enterprise AI implementation today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadQualified, setLeadQualified] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI assistant for INTinc Technology, an enterprise AI implementation firm.

Conversation history:
${conversationHistory}
user: ${userMessage}

Your role:
1. Answer questions about INTinc's services (AI implementation, security-first architecture, workshops, consulting)
2. Qualify leads by understanding their needs (security, ROI, training, custom solutions)
3. Recommend relevant case studies or services
4. For complex inquiries, suggest booking a consultation via contact form

Knowledge base:
- Services: Security-first AI, rapid prototyping, custom engineering, training, infrastructure management
- Workshops: AI Demystification ($3,500), Implementation Bootcamp ($12,500), Ideation Workshop ($7,500)
- Approach: Discover → Harden → Ship
- Focus: MSP discipline + AI expertise, measurable outcomes, knowledge transfer

Respond professionally, concisely (2-3 sentences), and helpfully. If the inquiry requires detailed consultation, recommend visiting the contact page.

Also determine:
- isLeadQualified: true if user shows serious interest (wants consultation, pricing, specific implementation help)
- suggestedAction: "contact" | "workshop" | "case-study" | "continue" | null`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            isLeadQualified: { type: "boolean" },
            suggestedAction: { type: "string" }
          }
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
      
      if (response.isLeadQualified && !leadQualified) {
        setLeadQualified(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I'd love to connect you with our team for a detailed discussion. Would you like to fill out our contact form? I can help pre-fill it with your inquiry." 
          }]);
        }, 1000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble responding right now. Please try our contact form for immediate assistance." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-full shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open chat"
        >
          <MessageSquare className="w-7 h-7 text-signal-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-carbon-night border-2 border-flash-purple/50 rounded-2xl shadow-glow flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-flash-purple/30 bg-gradient-to-r from-flash-purple/20 to-fusion-pink/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-signal-white" />
              </div>
              <div>
                <div className="font-semibold text-signal-white">INTinc AI Assistant</div>
                <div className="text-xs text-signal-white/60">Powered by FlashFusion</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-signal-white/60 hover:text-signal-white" aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-flash-purple/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-flash-purple" />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-flash-purple to-fusion-pink text-signal-white' 
                    : 'bg-void border border-flash-purple/30 text-signal-white'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-fusion-pink/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-fusion-pink" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-flash-purple/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-flash-purple animate-spin" />
                </div>
                <div className="bg-void border border-flash-purple/30 p-3 rounded-lg">
                  <p className="text-sm text-signal-white/60">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {leadQualified && (
            <div className="px-4 pb-2 flex gap-2">
              <Link
                to={createPageUrl('Contact')}
                className="flex-1 px-3 py-2 bg-flash-purple/20 border border-flash-purple/30 rounded-lg text-xs font-semibold text-flash-purple hover:bg-flash-purple/30 transition-colors text-center"
              >
                Contact Form
              </Link>
              <Link
                to={createPageUrl('Workshops')}
                className="flex-1 px-3 py-2 bg-fusion-pink/20 border border-fusion-pink/30 rounded-lg text-xs font-semibold text-fusion-pink hover:bg-fusion-pink/30 transition-colors text-center"
              >
                View Workshops
              </Link>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-flash-purple/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about AI implementation..."
                className="flex-1 px-4 py-2 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-signal-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(244,114,182,0.4);
        }
      `}</style>
    </>
  );
}