import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../utils/calculations';

export default function ShareModal({ isOpen, onClose, meetingData }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && meetingData) {
      generateImage();
    }
  }, [isOpen, meetingData]);

  const generateImage = async () => {
    const shareCard = document.getElementById('share-card');
    if (!shareCard) return;

    try {
      const canvas = await html2canvas(shareCard, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const url = canvas.toDataURL('image/png');
      setImageUrl(url);
    } catch (error) {
      console.error('Failed to generate image:', error);
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
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.download = `meeting-cost-${Date.now()}.png`;
    link.href = imageUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Meeting Cost</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Share Card - Hidden element for screenshot */}
        <div className="mb-6">
          <div
            id="share-card"
            className="bg-white p-8 border-4 border-gray-900 rounded-lg"
            style={{ width: '600px', height: 'auto' }}
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                💰 MEETING COST REPORT
              </h1>

              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <p className="text-xl text-gray-700 mb-4">
                  This {meetingData?.minutes || 0}-minute meeting
                  <br />
                  cost us
                </p>

                <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
                  {formatCurrency(meetingData?.totalCost || 0)}
                </p>
              </div>

              <div className="space-y-3 mb-6 text-gray-700">
                <p className="text-lg">
                  That's <span className="font-bold">{meetingData?.engineeringHours || 0}h</span> engineering hours
                </p>
                <p className="text-lg">
                  or <span className="font-bold">{meetingData?.comparison?.value || 0}</span>{' '}
                  {meetingData?.comparison?.label || 'items'}
                </p>
              </div>

              <p className="text-2xl font-bold text-gray-900 mb-4">
                Could this have been an email?
              </p>

              <p className="text-sm text-gray-500">meetingcost.app</p>
            </div>
          </div>
        </div>

        {/* Preview and Actions */}
        {imageUrl && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <img src={imageUrl} alt="Meeting cost report" className="w-full rounded" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                💾 Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
