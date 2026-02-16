import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, FileText, Share2, Copy, Download, Loader2 } from 'lucide-react';
import ConfirmationDialog from '../components/shell/ConfirmationDialog';
import ContentEditor from '../components/ContentEditor';
import ContentStrategyPlanner from '../components/ContentStrategyPlanner';

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
  const [contentMetadata, setContentMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [showEditor, setShowEditor] = useState(false);

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
      
      // Automatically analyze and tag the content
      await analyzeAndTagContent(result);
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeAndTagContent = async (content) => {
    setLoadingTags(true);
    try {
      const metadata = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this content and provide comprehensive SEO and categorization metadata.

Content Title: ${content.title}
Content Type: ${formData.contentType}
Content Body: ${content.content.substring(0, 2000)}...

Provide detailed metadata:
1. Primary Topic/Category (e.g., "AI Security", "Business Transformation", "Technical Implementation")
2. Sub-Topics (3-5 related themes found in the content)
3. SEO Keywords (10-15 keywords ranked by relevance: primary, secondary, long-tail)
4. Content Tags (5-7 tags for categorization)
5. Target Audience Segments (who would benefit from this content)
6. Content Difficulty Level (beginner, intermediate, advanced, expert)
7. Readability Score (1-10, where 10 is most readable)
8. SEO Score (1-100, assessing SEO optimization)
9. Suggested Meta Description (155 characters max, compelling and keyword-rich)
10. Alternative Titles (3 variations optimized for different platforms)
11. Related Topics (5 topics for content recommendations)
12. Content Sentiment (positive, neutral, professional, persuasive, etc.)

Focus on discoverability and SEO best practices.`,
        response_json_schema: {
          type: "object",
          properties: {
            primaryTopic: { type: "string" },
            subTopics: { type: "array", items: { type: "string" } },
            seoKeywords: {
              type: "object",
              properties: {
                primary: { type: "array", items: { type: "string" } },
                secondary: { type: "array", items: { type: "string" } },
                longTail: { type: "array", items: { type: "string" } }
              }
            },
            tags: { type: "array", items: { type: "string" } },
            targetAudience: { type: "array", items: { type: "string" } },
            difficultyLevel: { type: "string" },
            readabilityScore: { type: "number" },
            seoScore: { type: "number" },
            optimizedMetaDescription: { type: "string" },
            alternativeTitles: { type: "array", items: { type: "string" } },
            relatedTopics: { type: "array", items: { type: "string" } },
            sentiment: { type: "string" }
          }
        }
      });

      setContentMetadata(metadata);
    } catch (error) {
      console.error('Content tagging failed:', error);
    } finally {
      setLoadingTags(false);
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

  const handleContentUpdate = (newContent, changesSummary) => {
    // Save current content to history
    setEditHistory([...editHistory, {
      content: generatedContent.content,
      timestamp: Date.now(),
      summary: changesSummary
    }]);
    
    // Update content
    setGeneratedContent({
      ...generatedContent,
      content: newContent
    });
  };

  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="min-h-screen bg-void text-signal-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-int-navy to-int-orange bg-clip-text text-transparent">
            AI Content Generator
          </h1>
          <p className="text-signal-white/70">Create professional content for YOUR business in seconds</p>
          
          <div className="flex gap-2 mt-6 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'border-b-2 border-int-orange text-int-orange'
                  : 'text-signal-white/60 hover:text-signal-white'
              }`}
            >
              Content Generator
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === 'strategy'
                  ? 'border-b-2 border-int-orange text-int-orange'
                  : 'text-signal-white/60 hover:text-signal-white'
              }`}
            >
              Content Strategy
            </button>
          </div>
        </div>

        {activeTab === 'strategy' && <ContentStrategyPlanner />}

        {activeTab === 'generator' && (
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
                        onClick={() => setShowEditor(!showEditor)}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                          showEditor 
                            ? 'bg-int-orange text-white' 
                            : 'bg-void border border-int-navy/30 hover:border-int-orange'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        {showEditor ? 'Hide Editor' : 'Edit with AI'}
                      </button>
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

                  {editHistory.length > 0 && (
                    <div className="mt-4 p-3 bg-int-teal/10 rounded-lg border border-int-teal/30">
                      <div className="text-xs text-signal-white/60 mb-1">
                        {editHistory.length} edit{editHistory.length !== 1 ? 's' : ''} applied
                      </div>
                      <div className="text-sm text-int-teal">
                        Latest: {editHistory[editHistory.length - 1].summary}
                      </div>
                    </div>
                  )}
                </div>

                {showEditor && (
                  <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                    <ContentEditor 
                      content={generatedContent.content}
                      onContentUpdate={handleContentUpdate}
                    />
                  </div>
                )}

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

                {/* AI-Generated Metadata & Tags */}
                {loadingTags && (
                  <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-int-teal" />
                      <span className="text-signal-white/70">Analyzing and tagging content...</span>
                    </div>
                  </div>
                )}

                {contentMetadata && !loadingTags && (
                  <div className="space-y-4">
                    {/* SEO Score & Readability */}
                    <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                      <h4 className="text-lg font-bold mb-4 text-int-teal">Content Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-signal-white/60 mb-1">SEO Score</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-void rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  contentMetadata.seoScore >= 80 ? 'bg-green-500' :
                                  contentMetadata.seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${contentMetadata.seoScore}%` }}
                              />
                            </div>
                            <span className="text-lg font-bold">{contentMetadata.seoScore}/100</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-signal-white/60 mb-1">Readability</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-void rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-int-teal"
                                style={{ width: `${contentMetadata.readabilityScore * 10}%` }}
                              />
                            </div>
                            <span className="text-lg font-bold">{contentMetadata.readabilityScore}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-void rounded-lg">
                        <div className="text-xs text-signal-white/60 mb-1">Difficulty Level</div>
                        <div className="font-semibold capitalize">{contentMetadata.difficultyLevel}</div>
                      </div>
                    </div>

                    {/* Primary Topic & Categories */}
                    <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                      <h4 className="text-lg font-bold mb-4">Topic & Categorization</h4>
                      <div className="mb-4">
                        <div className="text-sm text-signal-white/60 mb-2">Primary Topic</div>
                        <div className="inline-block px-4 py-2 bg-int-orange/20 border border-int-orange/30 rounded-lg text-int-orange font-semibold">
                          {contentMetadata.primaryTopic}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-signal-white/60 mb-2">Sub-Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {contentMetadata.subTopics.map((topic, i) => (
                            <span key={i} className="px-3 py-1 bg-int-navy/20 border border-int-navy/30 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-signal-white/60 mb-2">Content Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {contentMetadata.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-int-teal/20 border border-int-teal/30 rounded-full text-sm text-int-teal">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SEO Keywords */}
                    <div className="p-6 bg-carbon-night rounded-xl border border-int-orange/30">
                      <h4 className="text-lg font-bold mb-4 text-int-orange">SEO Keywords</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-semibold text-signal-white/80 mb-2">Primary Keywords</div>
                          <div className="flex flex-wrap gap-2">
                            {contentMetadata.seoKeywords.primary.map((kw, i) => (
                              <span key={i} className="px-3 py-1 bg-int-orange/30 border border-int-orange rounded-full text-sm font-medium">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-signal-white/80 mb-2">Secondary Keywords</div>
                          <div className="flex flex-wrap gap-2">
                            {contentMetadata.seoKeywords.secondary.map((kw, i) => (
                              <span key={i} className="px-3 py-1 bg-int-navy/30 border border-int-navy rounded-full text-xs">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-signal-white/80 mb-2">Long-tail Keywords</div>
                          <div className="flex flex-wrap gap-2">
                            {contentMetadata.seoKeywords.longTail.map((kw, i) => (
                              <span key={i} className="px-3 py-1 bg-void border border-int-navy/30 rounded-full text-xs text-signal-white/70">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optimized Meta Description */}
                    <div className="p-6 bg-carbon-night rounded-xl border border-int-teal/30">
                      <h4 className="text-lg font-bold mb-3 text-int-teal">Optimized Meta Description</h4>
                      <div className="p-4 bg-void rounded-lg border border-int-teal/30">
                        <p className="text-sm text-signal-white/90">{contentMetadata.optimizedMetaDescription}</p>
                        <div className="text-xs text-signal-white/50 mt-2">
                          {contentMetadata.optimizedMetaDescription.length} characters
                        </div>
                      </div>
                    </div>

                    {/* Alternative Titles */}
                    <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                      <h4 className="text-lg font-bold mb-3">Alternative Titles</h4>
                      <div className="space-y-2">
                        {contentMetadata.alternativeTitles.map((title, i) => (
                          <div key={i} className="p-3 bg-void rounded-lg border border-int-navy/30">
                            <div className="text-sm font-medium">{title}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Audience & Related Topics */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                        <h4 className="text-sm font-bold mb-3">Target Audience</h4>
                        <div className="space-y-2">
                          {contentMetadata.targetAudience.map((aud, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-int-orange">•</span>
                              {aud}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-carbon-night rounded-xl border border-int-navy/30">
                        <h4 className="text-sm font-bold mb-3">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {contentMetadata.relatedTopics.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-int-teal/20 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
        )}

        <style jsx>{`
          .shadow-glow {
            box-shadow: 0 0 30px rgba(242,101,34,0.6), 0 0 60px rgba(30,58,95,0.4);
          }
        `}</style>
      </div>
    </div>
  );
}