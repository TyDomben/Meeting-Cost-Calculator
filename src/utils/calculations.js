// Meeting cost calculation utilities
import {
  WORK_HOURS_PER_YEAR,
  OVERHEAD_MULTIPLIER,
  COST_PER_FEATURE,
  COST_PER_BUG_FIX,
  COST_PER_LINE_OF_CODE,
  COST_PER_PR_REVIEW,
  PRICES,
  PRESETS,
  EFFICIENCY_THRESHOLDS,
} from './constants';

// Re-export PRESETS for backward compatibility
export { PRESETS };

/**
 * Calculate the total cost of a meeting
 * @param {number} annualSalary - Average annual salary
 * @param {number} numberOfPeople - Number of meeting attendees
 * @param {number} minutes - Duration in minutes
 * @returns {number} Total cost with overhead
 */
export function calculateMeetingCost(annualSalary, numberOfPeople, minutes) {
  const hourlyRate = annualSalary / WORK_HOURS_PER_YEAR;
  const minuteRate = hourlyRate / 60;
  const costPerMinute = minuteRate * numberOfPeople;
  const totalCost = costPerMinute * minutes;
  const actualCost = totalCost * OVERHEAD_MULTIPLIER;

  return actualCost;
}

/**
 * Calculate cost per minute
 */
export function calculateCostPerMinute(annualSalary, numberOfPeople) {
  const hourlyRate = annualSalary / WORK_HOURS_PER_YEAR;
  const minuteRate = hourlyRate / 60;
  const costPerMinute = minuteRate * numberOfPeople * OVERHEAD_MULTIPLIER;

  return costPerMinute;
}

/**
 * Calculate cost per person
 */
export function calculateCostPerPerson(totalCost, numberOfPeople) {
  return totalCost / numberOfPeople;
}

/**
 * Calculate opportunity costs (engineering hours, features, bugs, etc.)
 */
export function calculateOpportunityCosts(totalCost, annualSalary) {
  const hourlyRate = annualSalary / WORK_HOURS_PER_YEAR;

  return {
    engineeringHours: (totalCost / (hourlyRate * OVERHEAD_MULTIPLIER)).toFixed(1),
    features: Math.floor(totalCost / COST_PER_FEATURE),
    bugs: Math.floor(totalCost / COST_PER_BUG_FIX),
    linesOfCode: Math.floor(totalCost / COST_PER_LINE_OF_CODE),
    pullRequests: Math.floor(totalCost / COST_PER_PR_REVIEW),
  };
}

/**
 * Calculate absurd comparisons for perspective
 */
export function calculateComparisons(totalCost) {
  return {
    coffee: Math.floor(totalCost / PRICES.coffee),
    iphones: (totalCost / PRICES.iphone).toFixed(1),
    netflix: Math.floor((totalCost / PRICES.netflix) * 12), // Annual subscriptions
    lamborghini: (totalCost / PRICES.lamborghini).toFixed(6),
    bigMacs: Math.floor(totalCost / PRICES.bigMac),
    avocadoToast: Math.floor(totalCost / PRICES.avocadoToast),
    pizza: Math.floor(totalCost / PRICES.pizza),
    spotify: Math.floor((totalCost / PRICES.spotify) * 12), // Annual subscriptions
    movies: Math.floor(totalCost / PRICES.movie),
    starbucks: Math.floor(totalCost / PRICES.starbucks),
  };
}

/**
 * Get efficiency rating based on meeting duration and cost
 */
export function getEfficiencyRating(minutes, cost) {
  if (minutes < EFFICIENCY_THRESHOLDS.acceptable.maxMinutes) {
    return EFFICIENCY_THRESHOLDS.acceptable;
  }
  if (minutes < EFFICIENCY_THRESHOLDS.moderate.maxMinutes && cost < EFFICIENCY_THRESHOLDS.moderate.maxCost) {
    return EFFICIENCY_THRESHOLDS.moderate;
  }
  if (minutes < EFFICIENCY_THRESHOLDS.questionable.maxMinutes && cost < EFFICIENCY_THRESHOLDS.questionable.maxCost) {
    return EFFICIENCY_THRESHOLDS.questionable;
  }
  return EFFICIENCY_THRESHOLDS.poor;
}

/**
 * Format currency
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format time in minutes and seconds
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

/**
 * Format time in just minutes
 */
export function formatMinutes(seconds) {
  return Math.floor(seconds / 60);
}

/**
 * Abbreviate large numbers
 */
export function abbreviateNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
