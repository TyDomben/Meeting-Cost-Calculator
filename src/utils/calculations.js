// Meeting cost calculation utilities

export const PRESETS = {
  startup: { name: 'Startup', people: 5, salary: 75000 },
  tech: { name: 'Tech Company', people: 8, salary: 120000 },
  enterprise: { name: 'Enterprise', people: 12, salary: 95000 },
  executive: { name: 'Executives', people: 5, salary: 200000 },
  mixed: { name: 'Mixed Team', people: 7, salary: 110000 },
  allHands: { name: 'All-Hands', people: 50, salary: 110000 },
};

/**
 * Calculate the total cost of a meeting
 * @param {number} annualSalary - Average annual salary
 * @param {number} numberOfPeople - Number of meeting attendees
 * @param {number} minutes - Duration in minutes
 * @returns {number} Total cost with overhead
 */
export function calculateMeetingCost(annualSalary, numberOfPeople, minutes) {
  const hourlyRate = annualSalary / 2080; // 2080 work hours per year
  const minuteRate = hourlyRate / 60;
  const costPerMinute = minuteRate * numberOfPeople;
  const totalCost = costPerMinute * minutes;
  const actualCost = totalCost * 1.4; // 40% overhead for benefits, etc.

  return actualCost;
}

/**
 * Calculate cost per minute
 */
export function calculateCostPerMinute(annualSalary, numberOfPeople) {
  const hourlyRate = annualSalary / 2080;
  const minuteRate = hourlyRate / 60;
  const costPerMinute = minuteRate * numberOfPeople * 1.4;

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
  const hourlyRate = annualSalary / 2080;

  return {
    engineeringHours: (totalCost / (hourlyRate * 1.4)).toFixed(1),
    features: Math.floor(totalCost / 800),
    bugs: Math.floor(totalCost / 110),
    linesOfCode: Math.floor(totalCost / 3),
    pullRequests: Math.floor(totalCost / 170),
  };
}

/**
 * Calculate absurd comparisons for perspective
 */
export function calculateComparisons(totalCost) {
  return {
    coffee: Math.floor(totalCost / 5),
    iphones: (totalCost / 999).toFixed(1),
    netflix: Math.floor((totalCost / 15.49) * 12),
    lamborghini: (totalCost / 500000).toFixed(6),
    bigMacs: Math.floor(totalCost / 5.69),
    avocadoToast: Math.floor(totalCost / 12),
  };
}

/**
 * Get efficiency rating based on meeting duration and cost
 */
export function getEfficiencyRating(minutes, cost) {
  if (minutes < 15) {
    return {
      rating: '🟢 ACCEPTABLE',
      message: 'Short and sweet',
      color: 'text-success-green'
    };
  }
  if (minutes < 30 && cost < 500) {
    return {
      rating: '🟡 MODERATE',
      message: 'Could be an email?',
      color: 'text-warning-orange'
    };
  }
  if (minutes < 45 && cost < 1000) {
    return {
      rating: '🟠 QUESTIONABLE',
      message: 'Are decisions being made?',
      color: 'text-warning-orange'
    };
  }
  return {
    rating: '🔴 POOR',
    message: 'This should definitely have been an email',
    color: 'text-cost-red'
  };
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
