import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Loader2 } from 'lucide-react';

export function CaseStudySummary({ caseStudyData }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSummary();
  }, []);

  const generateSummary = async () => {
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a compelling executive summary for this case study.

Case Study Data:
Title: ${caseStudyData.title}
Industry: ${caseStudyData.industry}
Challenge: ${caseStudyData.challenge}
Solution: ${caseStudyData.solution}
Results: ${caseStudyData.results.join(', ')}
Metrics: ${JSON.stringify(caseStudyData.metrics)}

Create:
1. Executive summary (2-3 sentences highlighting transformation and ROI)
2. Key takeaway (1 sentence for decision-makers)
3. Impact score (1-10 based on measurable outcomes)
4. Primary benefit category (efficiency, cost-savings, innovation, risk-reduction)`,
        response_json_schema: {
          type: "object",
          properties: {
            executiveSummary: { type: "string" },
            keyTakeaway: { type: "string" },
            impactScore: { type: "number" },
            benefitCategory: { type: "string" }
          }
        }
      });

      setSummary(result);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-int-navy/10 border border-int-navy/30 rounded-xl">
        <div className="flex items-center gap-2 text-int-navy mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-semibold">Generating AI Summary...</span>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="p-6 bg-gradient-to-br from-int-navy/10 to-int-teal/10 border border-int-navy/30 rounded-xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-int-orange" />
        <h3 className="font-bold text-int-navy">AI-Generated Summary</h3>
      </div>
      <p className="text-signal-white/90 mb-4">{summary.executiveSummary}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="px-4 py-2 bg-int-orange/20 border border-int-orange/30 rounded-lg">
          <div className="text-xs text-signal-white/60">Impact Score</div>
          <div className="text-2xl font-bold text-int-orange">{summary.impactScore}/10</div>
        </div>
        <div className="px-4 py-2 bg-int-teal/20 border border-int-teal/30 rounded-lg">
          <div className="text-xs text-signal-white/60">Category</div>
          <div className="text-sm font-bold text-int-teal capitalize">{summary.benefitCategory}</div>
        </div>
      </div>
      <div className="p-4 bg-void/50 rounded-lg border-l-4 border-int-orange">
        <div className="text-xs text-int-orange mb-1 font-semibold">Key Takeaway</div>
        <p className="text-sm text-signal-white/80 italic">{summary.keyTakeaway}</p>
      </div>
    </div>
  );
}

export function RelatedCaseStudies({ currentStudyId, currentCategory, allCaseStudies }) {
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findRelated();
  }, []);

  const findRelated = async () => {
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze case studies and recommend related ones based on content similarity.

Current Case Study: ${currentStudyId} - ${currentCategory}

All Case Studies:
${allCaseStudies.map((cs, i) => `${i + 1}. ${cs.title} - ${cs.category} - ${cs.industry}`).join('\n')}

Select 3 most relevant case studies (by index) that:
1. Share similar challenges or solutions
2. Target similar industries or use cases
3. Demonstrate complementary AI capabilities

Explain why each is related (1 sentence).`,
        response_json_schema: {
          type: "object",
          properties: {
            recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  index: { type: "number" },
                  reason: { type: "string" }
                }
              }
            }
          }
        }
      });

      const related = result.recommendations
        .map(rec => ({
          ...allCaseStudies[rec.index - 1],
          reason: rec.reason,
          studyNumber: rec.index
        }))
        .filter(Boolean);

      setRelatedStudies(related);
    } catch (error) {
      console.error('Failed to find related studies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || relatedStudies.length === 0) return null;

  return (
    <div className="mt-16 p-8 bg-carbon-night rounded-2xl border border-int-navy/30">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-int-orange" />
        <h3 className="text-2xl font-bold">Related Case Studies</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedStudies.map((study, i) => (
          <a
            key={i}
            href={`/CaseStudy${study.studyNumber}`}
            className="p-6 bg-void rounded-xl border border-int-teal/30 hover:border-int-orange transition-all group"
          >
            <div className="text-sm text-int-orange mb-2">{study.category}</div>
            <h4 className="font-bold mb-2 group-hover:text-int-orange transition-colors">
              {study.title}
            </h4>
            <p className="text-sm text-signal-white/60 mb-3">{study.reason}</p>
            <div className="text-int-navy text-sm font-semibold">View Case Study →</div>
          </a>
        ))}
      </div>
    </div>
  );
}