import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Wand2, Loader2, Type, Sparkles, Target, PlusCircle } from 'lucide-react';
import ConfirmationDialog from './shell/ConfirmationDialog';

export default function ContentEditor({ content, onContentUpdate }) {
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [targetTone, setTargetTone] = useState('professional');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const tones = ['professional', 'conversational', 'technical', 'persuasive', 'friendly', 'authoritative'];

  const handleEdit = async (type, params = {}) => {
    setLoading(true);
    try {
      const prompts = {
        readability: `Improve the readability of this content while maintaining its message and key points.

Original Content:
${content}

Make it:
- Easier to scan and digest
- Use shorter sentences and simpler words where appropriate
- Break up long paragraphs
- Add better transitions
- Maintain professional quality

Return the improved version with the same structure and format.`,

        tone: `Adjust the tone and style of this content to be more ${params.tone}.

Original Content:
${content}

Target Tone: ${params.tone}

Transform the content to match this tone while:
- Keeping all key information and facts
- Maintaining the same structure
- Ensuring consistency throughout
- Staying professional and on-brand

Return the adjusted content.`,

        keywords: `Optimize this content for the following keywords: ${params.keywords}

Original Content:
${content}

Instructions:
- Naturally integrate the keywords throughout
- Maintain readability and flow
- Don't over-optimize (keyword stuffing)
- Keep the original message intact
- Use keyword variations where appropriate

Return the optimized content.`,

        expand: `Expand and enhance this content with more detail, examples, and depth.

Original Content:
${content}

Add:
- More detailed explanations
- Real-world examples and use cases
- Supporting data or statistics (if relevant)
- Additional context and background
- Actionable insights

Make it more comprehensive while maintaining clarity and focus.`,

        rephrase: `Rephrase this content to say the same thing in a different, more engaging way.

Original Content:
${content}

Create a fresh version that:
- Conveys the same core message
- Uses different sentence structures
- Employs varied vocabulary
- Maintains or improves impact
- Keeps the same general length

Return the rephrased content.`,

        custom: `${params.prompt}

Content to edit:
${content}

Apply the requested changes while maintaining professional quality and coherence.`
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompts[type],
        response_json_schema: {
          type: "object",
          properties: {
            editedContent: { type: "string" },
            changesSummary: { type: "string" }
          }
        }
      });

      onContentUpdate(result.editedContent, result.changesSummary);
      setEditMode(null);
      setCustomPrompt('');
    } catch (error) {
      console.error('Content editing failed:', error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const initiateEdit = (type, params = {}) => {
    setPendingAction({ type, params });
    setShowConfirm(true);
  };

  const confirmEdit = () => {
    if (pendingAction) {
      handleEdit(pendingAction.type, pendingAction.params);
    }
  };

  const getActionLabel = () => {
    if (!pendingAction) return 'Apply Changes';
    const labels = {
      readability: 'Improve Readability',
      tone: `Change Tone to ${pendingAction.params.tone}`,
      keywords: 'Optimize Keywords',
      expand: 'Expand Content',
      rephrase: 'Rephrase Content',
      custom: 'Apply Custom Edit'
    };
    return labels[pendingAction.type] || 'Apply Changes';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-5 h-5 text-int-orange" />
        <h4 className="text-lg font-bold">AI Content Editor</h4>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Quick Actions */}
        <button
          onClick={() => initiateEdit('readability')}
          disabled={loading}
          className="p-4 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all text-left disabled:opacity-50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-5 h-5 text-int-teal" />
            <span className="font-semibold text-sm">Improve Readability</span>
          </div>
          <p className="text-xs text-signal-white/60">Make it easier to read and scan</p>
        </button>

        <button
          onClick={() => setEditMode('tone')}
          disabled={loading}
          className="p-4 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all text-left disabled:opacity-50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-int-teal" />
            <span className="font-semibold text-sm">Adjust Tone</span>
          </div>
          <p className="text-xs text-signal-white/60">Change the style and voice</p>
        </button>

        <button
          onClick={() => setEditMode('keywords')}
          disabled={loading}
          className="p-4 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all text-left disabled:opacity-50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-int-teal" />
            <span className="font-semibold text-sm">Optimize Keywords</span>
          </div>
          <p className="text-xs text-signal-white/60">Better SEO targeting</p>
        </button>

        <button
          onClick={() => initiateEdit('expand')}
          disabled={loading}
          className="p-4 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all text-left disabled:opacity-50"
        >
          <div className="flex items-center gap-3 mb-2">
            <PlusCircle className="w-5 h-5 text-int-teal" />
            <span className="font-semibold text-sm">Expand Content</span>
          </div>
          <p className="text-xs text-signal-white/60">Add more detail and examples</p>
        </button>
      </div>

      {/* Tone Selector */}
      {editMode === 'tone' && (
        <div className="p-4 bg-carbon-night rounded-lg border border-int-orange/30 space-y-3">
          <label className="block text-sm font-medium">Select Target Tone</label>
          <select
            value={targetTone}
            onChange={(e) => setTargetTone(e.target.value)}
            className="w-full px-4 py-2 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange text-signal-white"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => initiateEdit('tone', { tone: targetTone })}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Apply Tone'}
            </button>
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Keywords Optimizer */}
      {editMode === 'keywords' && (
        <div className="p-4 bg-carbon-night rounded-lg border border-int-orange/30 space-y-3">
          <label className="block text-sm font-medium">Target Keywords</label>
          <input
            type="text"
            value={targetKeywords}
            onChange={(e) => setTargetKeywords(e.target.value)}
            placeholder="e.g., AI security, enterprise solutions, automation"
            className="w-full px-4 py-2 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange text-signal-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => initiateEdit('keywords', { keywords: targetKeywords })}
              disabled={loading || !targetKeywords}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Optimize'}
            </button>
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 bg-void border border-int-navy/30 rounded-lg hover:border-int-orange transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom Edit */}
      <div className="p-4 bg-carbon-night rounded-lg border border-int-navy/30 space-y-3">
        <label className="block text-sm font-medium">Custom Edit Instructions</label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="e.g., Make it more concise, add statistics, emphasize security benefits..."
          rows="3"
          className="w-full px-4 py-2 bg-void border border-int-navy/30 rounded-lg focus:outline-none focus:border-int-orange text-signal-white resize-none"
        />
        <button
          onClick={() => initiateEdit('custom', { prompt: customPrompt })}
          disabled={loading || !customPrompt}
          className="w-full px-4 py-2 bg-gradient-to-r from-int-orange to-int-navy rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Editing...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Apply Custom Edit
            </>
          )}
        </button>
      </div>

      <ConfirmationDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmEdit}
        title="Apply AI Content Edit"
        description="This will use AI to modify your content based on the selected parameters. The original will be replaced."
        actionType="edit"
        actionLabel={getActionLabel()}
        previewData={pendingAction?.params}
      />

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 30px rgba(242,101,34,0.6), 0 0 60px rgba(30,58,95,0.4);
        }
      `}</style>
    </div>
  );
}