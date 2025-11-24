// Application constants and configuration

// Calculation constants
export const WORK_HOURS_PER_YEAR = 2080; // 40 hours/week * 52 weeks
export const OVERHEAD_MULTIPLIER = 1.4; // 40% overhead for benefits, equipment, etc.
export const COMPARISON_ROTATION_INTERVAL = 10000; // 10 seconds
export const COST_UPDATE_INTERVAL = 1000; // 1 second
export const TAB_TITLE_UPDATE_INTERVAL = 1000; // 1 second

// Opportunity cost estimates (in dollars)
export const COST_PER_FEATURE = 800;
export const COST_PER_BUG_FIX = 110;
export const COST_PER_LINE_OF_CODE = 3;
export const COST_PER_PR_REVIEW = 170;

// Comparison prices
export const PRICES = {
  coffee: 5,
  iphone: 999,
  netflix: 15.49, // monthly
  lamborghini: 500000,
  bigMac: 5.69,
  avocadoToast: 12,
  pizza: 18,
  spotify: 10.99, // monthly
  movie: 15,
  starbucks: 6,
};

// Preset configurations
export const PRESETS = {
  startup: { name: 'Startup', people: 5, salary: 75000, emoji: '🚀' },
  tech: { name: 'Tech Company', people: 8, salary: 120000, emoji: '💻' },
  enterprise: { name: 'Enterprise', people: 12, salary: 95000, emoji: '🏢' },
  executive: { name: 'Executives', people: 5, salary: 200000, emoji: '👔' },
  mixed: { name: 'Mixed Team', people: 7, salary: 110000, emoji: '👥' },
  allHands: { name: 'All-Hands', people: 50, salary: 110000, emoji: '🎯' },
};

// Efficiency rating thresholds
export const EFFICIENCY_THRESHOLDS = {
  acceptable: { maxMinutes: 15, rating: '🟢 ACCEPTABLE', message: 'Short and sweet', color: 'text-success-green' },
  moderate: { maxMinutes: 30, maxCost: 500, rating: '🟡 MODERATE', message: 'Could this be an email?', color: 'text-warning-orange' },
  questionable: { maxMinutes: 45, maxCost: 1000, rating: '🟠 QUESTIONABLE', message: 'Are decisions being made?', color: 'text-warning-orange' },
  poor: { rating: '🔴 POOR', message: 'This should definitely have been an email', color: 'text-cost-red' },
};

// Validation limits
export const VALIDATION = {
  minPeople: 1,
  maxPeople: 1000,
  minSalary: 30000,
  maxSalary: 500000,
  minMinutes: 0,
  maxMinutes: 480, // 8 hours
};

// Storage
export const STORAGE_KEYS = {
  meetingHistory: 'meeting_history',
  preferences: 'meeting_calc_preferences',
};

export const MAX_HISTORY_ITEMS = 10;

// Animation durations (in ms)
export const ANIMATIONS = {
  fadeIn: 500,
  pulseSubtle: 5000,
  comparisonRotation: 10000,
  modalTransition: 300,
  tooltipDelay: 500,
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  pause: ' ', // spacebar
  reset: 'r',
  share: 's',
  history: 'h',
  escape: 'Escape',
};

// Tooltips
export const TOOLTIPS = {
  overhead: 'Includes 40% overhead for benefits, equipment, office space, and other employer costs',
  engineeringHours: 'Based on actual hourly rates with overhead included',
  features: 'Estimated at $800 per feature based on industry averages',
  bugs: 'Estimated at $110 per bug fix based on industry averages',
  linesOfCode: 'Estimated at $3 per line based on industry averages',
  pullRequests: 'Estimated at $170 per pull request review',
  workHours: 'Based on 2,080 work hours per year (40 hours/week × 52 weeks)',
  comparisons: 'Comparisons for perspective, not precision',
  efficiency: 'Based on meeting duration and total cost',
};
