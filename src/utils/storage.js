// LocalStorage utilities for meeting history
import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from './constants';

const STORAGE_KEY = STORAGE_KEYS.meetingHistory;
const MAX_HISTORY = MAX_HISTORY_ITEMS;

/**
 * Save a meeting to history
 */
export function saveMeetingToHistory(meeting) {
  try {
    const history = getMeetingHistory();
    const newMeeting = {
      ...meeting,
      timestamp: Date.now(),
    };

    history.unshift(newMeeting);

    // Keep only the last 10 meetings
    const trimmedHistory = history.slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save meeting to history:', error);
  }
}

/**
 * Get all meeting history
 */
export function getMeetingHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get meeting history:', error);
    return [];
  }
}

/**
 * Calculate total cost from history
 */
export function getTotalHistoryCost() {
  const history = getMeetingHistory();
  return history.reduce((total, meeting) => total + (meeting.totalCost || 0), 0);
}

/**
 * Clear meeting history
 */
export function clearMeetingHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear meeting history:', error);
  }
}

/**
 * Get monthly meeting cost
 */
export function getMonthlyMeetingCost() {
  const history = getMeetingHistory();
  const now = Date.now();
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

  return history
    .filter(meeting => meeting.timestamp >= thirtyDaysAgo)
    .reduce((total, meeting) => total + (meeting.totalCost || 0), 0);
}
