import { useState, useEffect, useRef } from 'react';
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

export default function LiveCalculator({
  numPeople,
  avgSalary,
  startTime,
  isPaused,
  onPause,
  onResume,
  onReset,
  onShare,
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
      setCurrentComparison((prev) => (prev + 1) % 4);
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
    { value: comparisons.coffee, label: 'cups of coffee' },
    { value: comparisons.iphones, label: 'iPhone 15 Pros' },
    { value: comparisons.netflix, label: 'annual Netflix subscriptions' },
    { value: comparisons.lamborghini, label: 'Lamborghinis' },
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
            <div className="bg-white px-8 py-4 rounded-lg shadow-xl">
              <p className="text-2xl font-bold text-gray-900">⏸️ PAUSED</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            💰 MEETING COST CALCULATOR
          </h1>
          <p className="text-purple-100 text-sm">
            {numPeople} people • ${(avgSalary / 1000).toFixed(0)}k avg • {formatMinutes(elapsedSeconds)}min
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
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Per minute:</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(costPerMin)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Per person:</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(costPerPerson)}</p>
            </div>
          </div>
        </div>

        {/* Opportunity Cost */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            💼 Opportunity Cost
          </h2>
          <div className="mb-4">
            <p className="text-lg mb-2">
              <span className="font-bold text-cost-red">{opportunityCosts.engineeringHours}h</span>
              {' '}engineering hours wasted
            </p>
            <p className="text-sm text-gray-600 mb-2">That's enough time to:</p>
            <ul className="space-y-1 text-sm text-gray-700 ml-4">
              <li>• Build {opportunityCosts.features || 0} features</li>
              <li>• Fix {opportunityCosts.bugs || 0} bugs</li>
              <li>• Write {opportunityCosts.linesOfCode || 0} lines of code</li>
              <li>• Review {opportunityCosts.pullRequests || 0} pull requests</li>
            </ul>
          </div>
        </div>

        {/* In Other Terms */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            ☕ In Other Terms
          </h2>
          <div className="min-h-[60px] flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-900 fade-in">
              {comparisonTexts[currentComparison].value}{' '}
              <span className="text-gray-600 text-lg">
                {comparisonTexts[currentComparison].label}
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-3 justify-center">
            {isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-2 px-6 py-3 bg-success-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                ▶️ Resume
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-2 px-6 py-3 bg-warning-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                ⏸️ Pause
              </button>
            )}
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => onShare(calculatorRef.current)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              📸 Share
            </button>
          </div>
        </div>

        {/* Efficiency Rating */}
        <div className="p-6">
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
      </div>
    </div>
  );
}
