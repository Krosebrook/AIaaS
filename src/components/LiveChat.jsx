import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageSquare, X, Send, Loader2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the InVelo AI assistant. I can help you understand our catalyst build model, explore use cases, or figure out which mission-complete tool fits your business challenge. What problem are you trying to solve?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadQualified, setLeadQualified] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interacted = localStorage.getItem('chat_interacted');
    if (interacted) setHasInteracted(true);
  }, []);

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
        prompt: `You are the InVelo AI assistant for INT Inc., a mission-complete AI services firm.

Conversation history:
${conversationHistory}
user: ${userMessage}

Your role:
1. Answer questions about InVelo's catalyst builds and mission-complete AI services
2. Explain the "Build it. Use it. Retire it." model
3. Qualify leads by understanding their time-bound business problems
4. Recommend relevant catalyst builds or the SOC 2 case study

Knowledge base:
- Services: Catalyst Builds from $5K–$250K, 4-week delivery, SOC 2 compliance built-in
- Hero Use Case: SOC 2 Audit Sprint ($25K vs $150K Big 4 consultant)
- Workshops: AI Discovery ($5K), Readiness Assessment ($7.5K–$15K), Governance & Compliance ($5K)
- Approach: Scope → Build → Operate → Retire (4-week cycle)
- Focus: Purpose-built tools for time-bound problems, client owns everything, zero vendor lock-in

Respond professionally, concisely (2-3 sentences), and helpfully. Emphasize 4-week delivery and client ownership.

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
          onClick={() => {
            setIsOpen(true);
            localStorage.setItem('chat_interacted', 'true');
            setHasInteracted(true);
          }}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-int-orange to-int-navy rounded-full shadow-lg hover:shadow-glow flex items-center justify-center hover:scale-110 transition-all group"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6 text-signal-white" />
          {!hasInteracted && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] bg-carbon-night border-2 border-int-orange/50 rounded-2xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-flash-purple/30 bg-gradient-to-r from-flash-purple/20 to-fusion-pink/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-flash-purple to-fusion-pink flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-signal-white" />
              </div>
              <div>
                <div className="font-semibold text-signal-white">InVelo AI Assistant</div>
                <div className="text-xs text-signal-white/60">INT Inc. Mission-Complete AI</div>
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