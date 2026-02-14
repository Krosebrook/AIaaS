import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, FileText, Share2, Copy, Download, Loader2 } from 'lucide-react';
import ConfirmationDialog from '../components/shell/ConfirmationDialog';

export default function ContentGenerator() {
  const [formData, setFormData] = useState({
    contentType: 'blog',
    topic: '',
    keywords: '',
    tone: 'professional',
    audience: 'enterprise',
    length: 'medium'
  });
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  const contentTypes = [
    { value: 'blog', label: 'Blog Post', icon: FileText },
    { value: 'marketing', label: 'Marketing Copy', icon: Sparkles },
    { value: 'social', label: 'Social Media', icon: Share2 },
    { value: 'email', label: 'Email Campaign', icon: FileText },
    { value: 'landing', label: 'Landing Page', icon: FileText },
    { value: 'technical', label: 'Tech Docs', icon: FileText },
    { value: 'ads', label: 'Ad Copy', icon: Sparkles }
  ];

  const tones = ['professional', 'conversational', 'technical', 'persuasive'];
  const audiences = ['enterprise', 'small-business', 'technical', 'executive'];
  const lengths = {
    blog: ['short (500 words)', 'medium (1000 words)', 'long (1500+ words)'],
    marketing: ['short (100 words)', 'medium (250 words)', 'long (500 words)'],
    social: ['twitter (280 chars)', 'linkedin (1500 chars)', 'thread (5 posts)'],
    email: ['single email', 'nurture sequence (3 emails)', 'promotional (5 emails)'],
    landing: ['hero + benefits', 'full page', 'conversion-focused'],
    technical: ['outline', 'summary', 'full documentation'],
    ads: ['short (25 words)', 'medium (50 words)', 'variations (3 versions)']
  };

  const generateContent = async () => {
    setLoading(true);
    try {
      const prompts = {
        blog: `Write a comprehensive blog post about: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Length: ${formData.length}

Brand Context: INTinc.com - Enterprise AI implementation firm. Our purpose is YOUR business. Focus on practical, measurable outcomes.

Create a well-structured blog post with:
- Compelling headline
- Introduction with hook
- 3-5 main sections with subheadings
- Real-world examples
- Actionable takeaways
- SEO-optimized conclusion with CTA

Include target keywords naturally throughout.`,
        
        marketing: `Write compelling marketing copy for: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Length: ${formData.length}

Brand Voice: INTinc.com - "Our Purpose is YOUR Business"
Key Themes: AI transformation, measurable ROI, enterprise security, practical implementation

Create persuasive copy that:
- Captures attention immediately
- Addresses specific pain points
- Highlights unique value proposition
- Includes strong call-to-action
- Uses "YOUR business" language consistent with brand

Format for: landing page, email campaign, or advertisement.`,
        
        social: `Create engaging social media content about: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Format: ${formData.length}

Brand: INTinc.com - Enterprise AI that serves YOUR business
Style: Professional but approachable, value-focused

Generate platform-optimized content:
- Attention-grabbing opening
- Key message/value prop
- Relevant hashtags (3-5)
- Call-to-action
- For threads: numbered posts with clear narrative flow

Focus on practical insights and business value.`,

        email: `Create email marketing content for: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Type: ${formData.length}

Brand: INTinc.com - Enterprise AI implementation firm

Generate professional email content:
- Compelling subject lines (3 variations)
- Email body with clear value proposition
- Personalization tokens for CRM integration
- Strong CTA
- For sequences: map out email timing and progression (Day 1, Day 3, Day 7, etc.)

Format for automation platforms. Include A/B test variations for subject lines.`,

        landing: `Write landing page copy for: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Page Type: ${formData.length}

Brand: INTinc.com - "Our Purpose is YOUR Business"

Create conversion-focused landing page:
- Headline (benefit-driven)
- Subheadline (expand on value)
- Hero section copy
- Feature/benefit sections (3-5)
- Social proof placement
- FAQ section (3-5 questions)
- CTA variations (primary, secondary)

Optimize for conversion and SEO.`,

        technical: `Create technical documentation for: ${formData.topic}

Technical Keywords: ${formData.keywords}
Complexity: ${formData.tone}
Audience: ${formData.audience}
Documentation Type: ${formData.length}

Company: INTinc.com - Enterprise AI Systems

Generate professional technical content:
- Overview/Introduction
- Architecture/System Design
- Key Components
- Integration Points
- Security Considerations
- Best Practices
- Troubleshooting Guide

Use clear, precise language appropriate for technical stakeholders.`,

        ads: `Create social media ad copy for: ${formData.topic}

Target Keywords: ${formData.keywords}
Tone: ${formData.tone}
Target Audience: ${formData.audience}
Format: ${formData.length}

Brand: INTinc.com - Enterprise AI Solutions

Generate high-performing ad copy:
- Attention-grabbing hooks
- Pain point identification
- Clear value proposition
- Urgency/scarcity elements
- Strong CTA
- Platform-specific formatting (Facebook, LinkedIn, Twitter)

Create variations for A/B testing. Focus on click-through optimization.`
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompts[formData.contentType],
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            seoMetaDescription: { type: "string" },
            suggestedHashtags: { type: "array", items: { type: "string" } },
            keyTakeaways: { type: "array", items: { type: "string" } }
          }
        }
      });

      setGeneratedContent(result);
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadContent = () => {
    const blob = new Blob([`# ${generatedContent.title}\n\n${generatedContent.content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.topic.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.md`;
    a.click();
    setShowDownloadConfirm(false);
  };

  const handleGenerateClick = () => {
    setShowGenerateConfirm(true);
  };

  const confirmGenerate = async () => {
    setShowGenerateConfirm(false);
    await generateContent();
  };

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            AI Content Generator
          </h1>
          <p className="text-signal-white/70">Create professional content for YOUR business in seconds</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
              <h3 className="text-xl font-bold mb-4">Content Type</h3>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                {contentTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, contentType: type.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.contentType === type.value
                          ? 'border-int-orange bg-int-orange/20'
                          : 'border-int-navy/30 hover:border-int-navy'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${
                        formData.contentType === type.value ? 'text-int-orange' : 'text-signal-white/60'
                      }`} />
                      <div className="text-sm font-semibold">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., AI security in enterprise environments"
                  className="w-full px-4 py-3 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange transition-colors text-signal-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Keywords</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="e.g., enterprise AI, AI security, business transformation"
                  className="w-full px-4 py-3 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange transition-colors text-signal-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-4 py-3 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange transition-colors text-signal-white"
                  >
                    {tones.map(tone => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full px-4 py-3 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange transition-colors text-signal-white"
                  >
                    {audiences.map(aud => (
                      <option key={aud} value={aud}>{aud}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Length</label>
                <select
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full px-4 py-3 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange transition-colors text-signal-white"
                >
                  {lengths[formData.contentType].map(len => (
                    <option key={len} value={len}>{len}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateClick}
                disabled={loading || !formData.topic || !formData.keywords}
                className="w-full px-6 py-4 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>
              
              <ConfirmationDialog
                isOpen={showGenerateConfirm}
                onClose={() => setShowGenerateConfirm(false)}
                onConfirm={confirmGenerate}
                title="Generate AI Content"
                description="This will use AI credits to generate content based on your specifications."
                actionType="play"
                actionLabel="Generate Content"
                previewData={{
                  contentType: formData.contentType.toUpperCase(),
                  topic: formData.topic,
                  keywords: formData.keywords,
                  tone: formData.tone,
                  audience: formData.audience,
                  length: formData.length
                }}
              />
            </div>
          </div>

          {/* Generated Content */}
          <div className="space-y-6">
            {generatedContent ? (
              <>
                <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-int-teal">Generated Content</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => setShowDownloadConfirm(true)}
                        className="px-4 py-2 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      
                      <ConfirmationDialog
                        isOpen={showDownloadConfirm}
                        onClose={() => setShowDownloadConfirm(false)}
                        onConfirm={downloadContent}
                        title="Download Generated Content"
                        description="Download this content as a Markdown file to your computer."
                        actionType="download"
                        actionLabel="Download File"
                        previewData={{
                          title: generatedContent?.title,
                          type: 'Markdown (.md)',
                          size: `~${Math.round((generatedContent?.content?.length || 0) / 1024)} KB`
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-int-orange/10 rounded-lg border border-int-orange/30">
                    <h4 className="text-lg font-bold text-int-orange mb-2">{generatedContent.title}</h4>
                    <p className="text-sm text-signal-white/70">{generatedContent.seoMetaDescription}</p>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-signal-white/90 whitespace-pre-wrap leading-relaxed">
                      {generatedContent.content}
                    </div>
                  </div>
                </div>

                {generatedContent.suggestedHashtags && (
                  <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                    <h4 className="text-sm font-semibold mb-2">Suggested Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.suggestedHashtags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-int-teal/20 border border-int-teal/30 rounded-full text-xs text-int-teal">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {generatedContent.keyTakeaways && (
                  <div className="p-4 bg-carbon-night rounded-xl border border-int-navy/30">
                    <h4 className="text-sm font-semibold mb-2">Key Takeaways</h4>
                    <ul className="space-y-2">
                      {generatedContent.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-signal-white/80">
                          <span className="text-int-orange mt-1">•</span>
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-12 bg-carbon-night rounded-xl border border-int-navy/30 border-dashed">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-signal-white/20 mx-auto mb-4" />
                  <p className="text-signal-white/40">Your generated content will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6), 0 0 60px rgba(30,58,95,0.4);
        }
      `}</style>
    </div>
  );
}