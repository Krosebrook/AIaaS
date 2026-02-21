import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Search, ChevronDown, Loader2 } from 'lucide-react';

export default function DynamicFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const categories = ['all', 'security', 'pricing', 'implementation', 'workshops', 'technical'];

  useEffect(() => {
    generateFAQs();
  }, []);

  const generateFAQs = async () => {
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a comprehensive FAQ list for InVelo by INT Inc., a mission-complete AI services firm.

Context:
- Services: Catalyst Builds ($5K–$250K), 4-week delivery, SOC 2 compliance built-in
- Hero Use Case: SOC 2 Audit Sprint ($25K vs $150K consultant)
- Pricing: Project-based $5K–$250K, Managed Operations $2K–$5K/month
- Approach: Scope → Build → Operate → Retire (4-week cycle)
- Focus: Purpose-built tools for time-bound problems, client owns everything, zero vendor lock-in
- Workshops: AI Discovery ($5K), Readiness Assessment ($7.5K–$15K), Governance & Compliance ($5K)

Generate 12 FAQ entries covering:
- The catalyst build model and delivery timeline (3 questions)
- Pricing and ownership (3 questions)
- Security and SOC 2 compliance (3 questions)
- How this differs from traditional consulting and SaaS (2 questions)
- Workshops and assessments (1 question)

Each FAQ should have: question (concise, user-focused), answer (2-3 sentences, professional), and category.`,
        response_json_schema: {
          type: "object",
          properties: {
            faqs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                  category: { type: "string" }
                }
              }
            }
          }
        }
      });

      setFaqs(result.faqs);
    } catch (error) {
      console.error('Failed to generate FAQs:', error);
      setFaqs([
        {
          question: "What is a catalyst build?",
          answer: "A catalyst build is a purpose-built AI tool designed for a specific time-bound business mission (like SOC 2 audits or onboarding). Built in 4 weeks, with SOC 2 compliance, flat pricing, and full client ownership—no vendor lock-in.",
          category: "pricing"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setSearching(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `User search query: "${searchQuery}"

Available FAQs:
${faqs.map((faq, i) => `${i + 1}. ${faq.question}\n${faq.answer}`).join('\n\n')}

Find the most relevant FAQ(s) that answer this query. Return the indices (1-based) of relevant FAQs, ranked by relevance.
If no FAQs match well, generate a brief answer based on InVelo's catalyst build model.`,
        response_json_schema: {
          type: "object",
          properties: {
            relevantIndices: { type: "array", items: { type: "number" } },
            customAnswer: { type: "string" }
          }
        }
      });

      setSearchResults(result);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const filteredFaqs = searchResults?.relevantIndices
    ? searchResults.relevantIndices.map(i => faqs[i - 1]).filter(Boolean)
    : faqs.filter(faq => selectedCategory === 'all' || faq.category === selectedCategory);

  return (
    <section className="py-24 px-6 bg-carbon-night" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-flash-purple to-fusion-pink bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-signal-white/80 mb-12">
          AI-powered answers to your enterprise AI questions
        </p>

        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-signal-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search FAQs with AI..."
                className="w-full pl-10 pr-4 py-3 bg-void border border-flash-purple/30 rounded-lg focus:outline-none focus:border-flash-purple transition-colors text-signal-white"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="px-6 py-3 bg-gradient-to-r from-flash-purple to-fusion-pink rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
            >
              {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </div>
          {searchResults?.customAnswer && (
            <div className="mt-4 p-4 bg-flash-purple/10 border border-flash-purple/30 rounded-lg">
              <p className="text-sm text-signal-white/90">{searchResults.customAnswer}</p>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchResults(null);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-flash-purple to-fusion-pink text-signal-white'
                  : 'bg-void border border-flash-purple/30 text-signal-white/70 hover:border-flash-purple'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-flash-purple mx-auto" />
            <p className="text-signal-white/60 mt-4">Generating FAQs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-void border border-flash-purple/30 rounded-xl overflow-hidden hover:border-flash-purple transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-signal-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-flash-purple flex-shrink-0 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="px-6 pb-4 text-signal-white/80">
                    <p>{faq.answer}</p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 bg-flash-purple/20 border border-flash-purple/30 rounded-full text-xs text-flash-purple">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(244,114,182,0.4);
        }
      `}</style>
    </section>
  );
}