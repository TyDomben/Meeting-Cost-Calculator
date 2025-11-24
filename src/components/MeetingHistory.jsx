import { useState, useEffect } from 'react';
import { getMeetingHistory, clearMeetingHistory, getTotalHistoryCost, getMonthlyMeetingCost } from '../utils/storage';
import { formatCurrency } from '../utils/calculations';
import { exportHistoryToCSV } from '../utils/export';

export default function MeetingHistory({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    const data = getMeetingHistory();
    setHistory(data);
    setTotalCost(getTotalHistoryCost());
    setMonthlyCost(getMonthlyMeetingCost());
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all meeting history? This cannot be undone.')) {
      clearMeetingHistory();
      loadHistory();
    }
  };

  const handleExport = () => {
    exportHistoryToCSV(history);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">📊 Meeting History</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl leading-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats */}
        {history.length > 0 && (
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">All-Time Cost</p>
                <p className="text-2xl font-bold text-cost-red">{formatCurrency(totalCost)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Last 30 Days</p>
                <p className="text-2xl font-bold text-warning-orange">{formatCurrency(monthlyCost)}</p>
              </div>
            </div>
          </div>
        )}

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No meeting history yet</p>
              <p className="text-gray-400 text-sm">Complete a meeting to see it here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((meeting, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{formatDate(meeting.timestamp)}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-700">
                          <span className="font-semibold">{meeting.numPeople}</span> people
                        </span>
                        <span className="text-sm text-gray-700">
                          <span className="font-semibold">{meeting.minutes}</span> min
                        </span>
                        <span className="text-sm text-gray-700">
                          ${(meeting.avgSalary / 1000).toFixed(0)}k avg
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cost-red">
                        {formatCurrency(meeting.totalCost)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {history.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-success-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                📥 Export CSV
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-cost-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Clear History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
