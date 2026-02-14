import React, { useState } from 'react';
import { AlertTriangle, Info, Trash2, Send, Play, Download, X } from 'lucide-react';

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  title,
  description,
  actionType = 'warning', // 'warning', 'danger', 'info'
  actionLabel = 'Confirm',
  previewData = null,
  children
}) {
  const [step, setStep] = useState(1); // 1 = Preview, 2 = Confirm
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    if (step === 1 && previewData) {
      setStep(2);
      return;
    }

    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const icons = {
    warning: AlertTriangle,
    danger: Trash2,
    info: Info,
    send: Send,
    play: Play,
    download: Download
  };

  const colors = {
    warning: 'text-yellow-600 bg-yellow-50',
    danger: 'text-red-600 bg-red-50',
    info: 'text-blue-600 bg-blue-50',
    send: 'text-orange-600 bg-orange-50',
    play: 'text-green-600 bg-green-50',
    download: 'text-blue-600 bg-blue-50'
  };

  const buttonColors = {
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    danger: 'bg-red-600 hover:bg-red-700',
    info: 'bg-blue-600 hover:bg-blue-700',
    send: 'bg-orange-600 hover:bg-orange-700',
    play: 'bg-green-600 hover:bg-green-700',
    download: 'bg-blue-600 hover:bg-blue-700'
  };

  const Icon = icons[actionType] || Info;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg ${colors[actionType]} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {step === 1 ? 'Preview & Validate' : 'Confirm Action'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {step === 1 && (
            <>
              <p className="text-slate-700 mb-4">{description}</p>
              
              {previewData && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Preview Changes</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(previewData).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-200 last:border-0">
                        <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-slate-900 font-medium max-w-xs truncate">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {children}
            </>
          )}

          {step === 2 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Final Confirmation Required</h4>
                  <p className="text-sm text-yellow-800">
                    This action cannot be undone. Please confirm that you want to proceed with this operation.
                  </p>
                  {previewData && (
                    <div className="mt-3 text-sm text-yellow-900">
                      <strong>Action:</strong> {actionLabel}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <div className="text-sm text-slate-500">
            {step === 1 && previewData ? 'Step 1 of 2: Review' : step === 2 ? 'Step 2 of 2: Confirm' : 'Confirmation Required'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className={`px-6 py-2 ${buttonColors[actionType]} text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {step === 1 && previewData ? 'Continue to Confirm' : actionLabel}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}