import { useState } from 'react';
import { PRESETS } from '../utils/calculations';
import { VALIDATION } from '../utils/constants';

export default function SetupScreen({ onStart, onShowHistory }) {
  const [numPeople, setNumPeople] = useState(7);
  const [avgSalary, setAvgSalary] = useState(120000);
  const [selectedPreset, setSelectedPreset] = useState('tech');
  const [startNow, setStartNow] = useState(true);
  const [minutesAgo, setMinutesAgo] = useState(0);
  const [errors, setErrors] = useState({});

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    const preset = PRESETS[presetKey];
    setNumPeople(preset.people);
    setAvgSalary(preset.salary);
  };

  const handleNumPeopleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumPeople(value);
    setSelectedPreset(''); // Clear preset when manually changing
  };

  const handleSalaryChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setAvgSalary(value);
    setSelectedPreset(''); // Clear preset when manually changing
  };

  const validate = () => {
    const newErrors = {};

    if (numPeople < VALIDATION.minPeople || numPeople > VALIDATION.maxPeople) {
      newErrors.people = `Please enter between ${VALIDATION.minPeople} and ${VALIDATION.maxPeople} people`;
    }

    if (avgSalary < VALIDATION.minSalary || avgSalary > VALIDATION.maxSalary) {
      newErrors.salary = `Salary must be between $${VALIDATION.minSalary.toLocaleString()} and $${VALIDATION.maxSalary.toLocaleString()}`;
    }

    if (!startNow && (minutesAgo < VALIDATION.minMinutes || minutesAgo > VALIDATION.maxMinutes)) {
      newErrors.time = `Please enter between ${VALIDATION.minMinutes} and ${VALIDATION.maxMinutes} minutes`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => {
    if (!validate()) return;

    const startTime = startNow
      ? Date.now()
      : Date.now() - (minutesAgo * 60 * 1000);

    onStart({
      numPeople,
      avgSalary,
      startTime,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 fade-in relative">
        {/* History Button */}
        <button
          onClick={onShowHistory}
          className="absolute top-6 right-6 text-white hover:text-purple-100 transition-colors"
          aria-label="View meeting history"
          title="View meeting history (H)"
        >
          <span className="text-2xl">📊</span>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💰 MEETING COST CALCULATOR
          </h1>
          <p className="text-purple-100 text-sm mt-2">Make every meeting count. Literally.</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Number of Attendees */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Number of attendees:
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={handleNumPeopleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg transition-colors"
              placeholder="e.g., 7"
              min={VALIDATION.minPeople}
              max={VALIDATION.maxPeople}
              aria-label="Number of meeting attendees"
            />
            {errors.people && (
              <p className="text-cost-red text-sm mt-1">{errors.people}</p>
            )}
          </div>

          {/* Average Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Average salary:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={avgSalary}
                onChange={handleSalaryChange}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg transition-colors"
                placeholder="e.g., 120000"
                min={VALIDATION.minSalary}
                max={VALIDATION.maxSalary}
                step="1000"
                aria-label="Average annual salary"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">per year</p>
            {errors.salary && (
              <p className="text-cost-red text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          {/* Presets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Or select preset:
            </label>
            <div className="space-y-2">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPreset === key
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="preset"
                    checked={selectedPreset === key}
                    onChange={() => handlePresetChange(key)}
                    className="w-4 h-4 text-purple-600"
                    aria-label={`Select ${preset.name} preset`}
                  />
                  <span className="text-xl">{preset.emoji}</span>
                  <span className="flex-1 text-gray-700 font-medium">
                    {preset.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {preset.people} • ${(preset.salary / 1000).toFixed(0)}k
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Meeting Start Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Meeting started:
            </label>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                startNow ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 bg-white'
              }`}>
                <input
                  type="radio"
                  name="startTime"
                  checked={startNow}
                  onChange={() => setStartNow(true)}
                  className="w-4 h-4 text-purple-600"
                  aria-label="Start meeting now"
                />
                <span className="text-gray-700 font-medium">Now</span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                !startNow ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 bg-white'
              }`}>
                <input
                  type="radio"
                  name="startTime"
                  checked={!startNow}
                  onChange={() => setStartNow(false)}
                  className="w-4 h-4 text-purple-600"
                  aria-label="Meeting started earlier"
                />
                <input
                  type="number"
                  value={minutesAgo}
                  onChange={(e) => {
                    setMinutesAgo(parseInt(e.target.value) || 0);
                    setStartNow(false);
                  }}
                  onClick={() => setStartNow(false)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="0"
                  min={VALIDATION.minMinutes}
                  max={VALIDATION.maxMinutes}
                  aria-label="Minutes ago the meeting started"
                />
                <span className="text-gray-700">minutes ago</span>
              </label>
            </div>
            {errors.time && (
              <p className="text-cost-red text-sm mt-1">{errors.time}</p>
            )}
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-lg uppercase tracking-wide"
            aria-label="Start calculating meeting cost"
          >
            Start Calculating
          </button>

          {/* Keyboard Hint */}
          <p className="text-xs text-center text-gray-400">
            Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded border">H</kbd> to view history
          </p>
        </div>
      </div>
    </div>
  );
}
