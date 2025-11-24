import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../utils/calculations';

export default function ShareModal({ isOpen, onClose, meetingData }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && meetingData) {
      generateImage();
    }
  }, [isOpen, meetingData]);

  const generateImage = async () => {
    setLoading(true);
    const shareCard = document.getElementById('share-card');
    if (!shareCard) {
      setLoading(false);
      return;
    }

    try {
      // Wait a bit for fonts to load
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(shareCard, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const url = canvas.toDataURL('image/png');
      setImageUrl(url);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!imageUrl) return;

    try {
      const blob = await (await fetch(imageUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy image to clipboard. Please try downloading instead.');
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `meeting-cost-report-${date}.png`;
    link.href = imageUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">📸 Share Meeting Cost Report</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl leading-none transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-4">⚙️</div>
                <p className="text-gray-600">Generating shareable image...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Hidden share card for screenshot */}
              <div className="mb-6 overflow-hidden">
                <div
                  id="share-card"
                  className="bg-white p-10 border-4 border-gray-900 rounded-xl mx-auto"
                  style={{ width: '800px', maxWidth: '100%' }}
                >
                  <div className="text-center">
                    <div className="mb-6">
                      <h1 className="text-4xl font-bold mb-2">💰 MEETING COST REPORT</h1>
                      <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded"></div>
                    </div>

                    <div className="mb-8 pb-8 border-b-4 border-gray-200">
                      <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
                        This <span className="font-bold text-purple-600">{meetingData?.minutes || 0}-minute</span> meeting
                        <br />
                        cost us
                      </p>

                      <div className="text-8xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                          {formatCurrency(meetingData?.totalCost || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-gray-700">
                      <p className="text-xl">
                        That's <span className="font-bold text-cost-red">{meetingData?.engineeringHours || 0}h</span> of engineering time
                      </p>
                      <p className="text-xl">
                        or <span className="font-bold text-cost-red">{meetingData?.comparison?.value || 0}</span>{' '}
                        {meetingData?.comparison?.label || 'items'}
                      </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 mb-6">
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        Could this have been an email?
                      </p>
                      <p className="text-gray-600">💭</p>
                    </div>

                    <div className="text-sm text-gray-400 border-t-2 border-gray-200 pt-4">
                      <p className="font-semibold">meetingcost.app</p>
                      <p className="text-xs mt-1">Make every meeting count. Literally.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {imageUrl && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Preview:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <img
                      src={imageUrl}
                      alt="Meeting cost report"
                      className="w-full rounded shadow-md"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              {imageUrl && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    {copied ? '✓ Copied to Clipboard!' : '📋 Copy to Clipboard'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    💾 Download PNG
                  </button>
                </div>
              )}

              {/* Tips */}
              <div className="mt-6 bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">💡 Tip:</span> Share this on Slack or Teams to encourage more efficient meetings!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
