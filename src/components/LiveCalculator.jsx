import { useState, useEffect, useRef } from 'react';
import Tooltip from './Tooltip';
import {
  calculateMeetingCost,
  calculateCostPerMinute,
  calculateCostPerPerson,
  calculateOpportunityCosts,
  calculateComparisons,
  getEfficiencyRating,
  formatCurrency,
  formatMinutes,
} from '../utils/calculations';
import { TOOLTIPS } from '../utils/constants';

export default function LiveCalculator({
  numPeople,
  avgSalary,
  startTime,
  isPaused,
  onPause,
  onResume,
  onReset,
  onShare,
  onShowHistory,
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentComparison, setCurrentComparison] = useState(0);
  const calculatorRef = useRef(null);

  // Update elapsed time every second
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPaused]);

  // Rotate comparisons every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComparison((prev) => (prev + 1) % 6);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const minutes = elapsedSeconds / 60;
  const totalCost = calculateMeetingCost(avgSalary, numPeople, minutes);
  const costPerMin = calculateCostPerMinute(avgSalary, numPeople);
  const costPerPerson = calculateCostPerPerson(totalCost, numPeople);
  const opportunityCosts = calculateOpportunityCosts(totalCost, avgSalary);
  const comparisons = calculateComparisons(totalCost);
  const efficiency = getEfficiencyRating(Math.floor(minutes), totalCost);

  const comparisonTexts = [
    { value: comparisons.coffee, label: 'cups of coffee', emoji: '☕' },
    { value: comparisons.iphones, label: 'iPhone 15 Pros', emoji: '📱' },
    { value: comparisons.netflix, label: 'Netflix subscriptions (annual)', emoji: '🎬' },
    { value: comparisons.pizza, label: 'large pizzas', emoji: '🍕' },
    { value: comparisons.spotify, label: 'Spotify subscriptions (annual)', emoji: '🎵' },
    { value: comparisons.movies, label: 'movie tickets', emoji: '🎥' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div
        ref={calculatorRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 fade-in relative"
      >
        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center z-10">
            <div className="bg-white px-8 py-4 rounded-lg shadow-xl animate-pulse">
              <p className="text-2xl font-bold text-gray-900">⏸️ PAUSED</p>
              <p className="text-sm text-gray-600 mt-1">Press Space to resume</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onShowHistory}
            className="absolute top-4 right-4 text-white hover:text-purple-100 transition-colors"
            aria-label="View meeting history"
            title="View meeting history (H)"
          >
            <span className="text-2xl">📊</span>
          </button>

          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            💰 MEETING COST CALCULATOR
          </h1>
          <p className="text-purple-100 text-sm">
            {numPeople} people • ${(avgSalary / 1000).toFixed(0)}k avg • {formatMinutes(elapsedSeconds)} min
          </p>
        </div>

        {/* Main Cost Display */}
        <div className="p-8 text-center border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            This meeting has cost
          </p>
          <div className="gradient-text text-7xl font-bold mb-4 pulse-subtle counter-animation">
            {formatCurrency(totalCost)}
          </div>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            ⏱️ {Math.floor(minutes)} minutes and counting...
          </p>
        </div>

        {/* Breakdown Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            📊 Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Tooltip content={`Cost increases by this amount every minute with ${numPeople} people`}>
              <div className="bg-gray-50 p-4 rounded-lg cursor-help">
                <p className="text-xs text-gray-600 mb-1">Per minute:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(costPerMin)}</p>
              </div>
            </Tooltip>
            <Tooltip content={`Individual cost per attendee for this ${Math.floor(minutes)}-minute meeting`}>
              <div className="bg-gray-50 p-4 rounded-lg cursor-help">
                <p className="text-xs text-gray-600 mb-1">Per person:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(costPerPerson)}</p>
              </div>
            </Tooltip>
          </div>
          <Tooltip content={TOOLTIPS.overhead}>
            <p className="text-xs text-gray-500 mt-3 cursor-help">
              ℹ️ Includes 40% overhead (benefits, equipment, office space)
            </p>
          </Tooltip>
        </div>

        {/* Opportunity Cost */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            💼 Opportunity Cost
          </h2>
          <div className="mb-4">
            <Tooltip content={TOOLTIPS.engineeringHours}>
              <p className="text-lg mb-2 cursor-help inline-block">
                <span className="font-bold text-cost-red">{opportunityCosts.engineeringHours}h</span>
                {' '}engineering hours wasted
              </p>
            </Tooltip>
            <p className="text-sm text-gray-600 mb-2">That's enough time to:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <Tooltip content={TOOLTIPS.features}>
                <li className="cursor-help hover:text-purple-600 transition-colors">
                  • Build <span className="font-semibold">{opportunityCosts.features || 0}</span> features
                </li>
              </Tooltip>
              <Tooltip content={TOOLTIPS.bugs}>
                <li className="cursor-help hover:text-purple-600 transition-colors">
                  • Fix <span className="font-semibold">{opportunityCosts.bugs || 0}</span> bugs
                </li>
              </Tooltip>
              <Tooltip content={TOOLTIPS.linesOfCode}>
                <li className="cursor-help hover:text-purple-600 transition-colors">
                  • Write <span className="font-semibold">{opportunityCosts.linesOfCode || 0}</span> lines of code
                </li>
              </Tooltip>
              <Tooltip content={TOOLTIPS.pullRequests}>
                <li className="cursor-help hover:text-purple-600 transition-colors">
                  • Review <span className="font-semibold">{opportunityCosts.pullRequests || 0}</span> pull requests
                </li>
              </Tooltip>
            </ul>
          </div>
        </div>

        {/* In Other Terms */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            ☕ In Other Terms
          </h2>
          <Tooltip content={TOOLTIPS.comparisons}>
            <div className="min-h-[60px] flex items-center justify-center cursor-help">
              <p className="text-2xl font-bold text-gray-900 fade-in">
                {comparisonTexts[currentComparison].emoji}{' '}
                <span className="text-cost-red">{comparisonTexts[currentComparison].value}</span>{' '}
                <span className="text-gray-600 text-lg">
                  {comparisonTexts[currentComparison].label}
                </span>
              </p>
            </div>
          </Tooltip>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-center">
            {isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-2 px-6 py-3 bg-success-green text-white font-semibold rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                title="Resume (Space)"
                aria-label="Resume meeting timer"
              >
                ▶️ Resume
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-2 px-6 py-3 bg-warning-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                title="Pause (Space)"
                aria-label="Pause meeting timer"
              >
                ⏸️ Pause
              </button>
            )}
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
              title="Reset (Ctrl+R)"
              aria-label="Reset and start new meeting"
            >
              🔄 Reset
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
              title="Share (Ctrl+S)"
              aria-label="Share meeting cost report"
            >
              📸 Share
            </button>
          </div>

          {/* Keyboard Hints */}
          <div className="mt-4 text-xs text-center text-gray-500">
            <p>
              <kbd className="px-2 py-1 bg-gray-100 rounded border mx-1">Space</kbd> Pause/Resume •
              <kbd className="px-2 py-1 bg-gray-100 rounded border mx-1">H</kbd> History •
              <kbd className="px-2 py-1 bg-gray-100 rounded border mx-1">Ctrl+S</kbd> Share
            </p>
          </div>
        </div>

        {/* Efficiency Rating */}
        <Tooltip content={TOOLTIPS.efficiency}>
          <div className="p-6 cursor-help">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Meeting efficiency rating:</p>
              <p className={`text-xl font-bold ${efficiency.color}`}>
                {efficiency.rating}
              </p>
              <p className="text-sm text-gray-500 mt-1 italic">
                {efficiency.message}
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
