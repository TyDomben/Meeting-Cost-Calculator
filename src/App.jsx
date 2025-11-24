import { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import LiveCalculator from './components/LiveCalculator';
import ShareModal from './components/ShareModal';
import MeetingHistory from './components/MeetingHistory';
import {
  calculateMeetingCost,
  calculateOpportunityCosts,
  calculateComparisons,
  formatMinutes,
} from './utils/calculations';
import { saveMeetingToHistory } from './utils/storage';
import { KEYBOARD_SHORTCUTS } from './utils/constants';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [numPeople, setNumPeople] = useState(7);
  const [avgSalary, setAvgSalary] = useState(120000);
  const [startTime, setStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [shareData, setShareData] = useState(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger if typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Close modals on Escape
      if (e.key === KEYBOARD_SHORTCUTS.escape) {
        setShareModalOpen(false);
        setHistoryModalOpen(false);
        return;
      }

      // Only enable shortcuts when calculator is running
      if (!isRunning) {
        // Allow history shortcut even when not running
        if (e.key === KEYBOARD_SHORTCUTS.history) {
          setHistoryModalOpen(true);
        }
        return;
      }

      switch (e.key) {
        case KEYBOARD_SHORTCUTS.pause:
          e.preventDefault();
          if (isPaused) {
            handleResume();
          } else {
            handlePause();
          }
          break;
        case KEYBOARD_SHORTCUTS.reset:
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleReset();
          }
          break;
        case KEYBOARD_SHORTCUTS.share:
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleShare();
          }
          break;
        case KEYBOARD_SHORTCUTS.history:
          e.preventDefault();
          setHistoryModalOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, isPaused, startTime, pausedTime, avgSalary, numPeople]);

  // Update browser tab title with running cost
  useEffect(() => {
    if (!isRunning || isPaused) {
      document.title = '💰 Meeting Cost Calculator';
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime - pausedTime) / 1000);
      const minutes = elapsed / 60;
      const totalCost = calculateMeetingCost(avgSalary, numPeople, minutes);
      document.title = `$${Math.floor(totalCost)} - Meeting Cost`;
    }, 1000);

    return () => {
      clearInterval(interval);
      document.title = '💰 Meeting Cost Calculator';
    };
  }, [isRunning, isPaused, startTime, pausedTime, avgSalary, numPeople]);

  const handleStart = ({ numPeople, avgSalary, startTime }) => {
    setNumPeople(numPeople);
    setAvgSalary(avgSalary);
    setStartTime(startTime);
    setPausedTime(0);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    // Add the paused duration to pausedTime
    const now = Date.now();
    const currentElapsed = now - startTime - pausedTime;
    setPausedTime(now - startTime - currentElapsed);
    setIsPaused(false);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset? This will clear the current meeting.')) {
      // Save to history before resetting
      if (startTime) {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime - pausedTime) / 1000);
        const minutes = elapsed / 60;
        const totalCost = calculateMeetingCost(avgSalary, numPeople, minutes);

        saveMeetingToHistory({
          numPeople,
          avgSalary,
          minutes: Math.floor(minutes),
          totalCost,
        });
      }

      setIsRunning(false);
      setIsPaused(false);
      setStartTime(null);
      setPausedTime(0);
    }
  };

  const handleShare = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime - pausedTime) / 1000);
    const minutes = elapsed / 60;
    const totalCost = calculateMeetingCost(avgSalary, numPeople, minutes);
    const opportunityCosts = calculateOpportunityCosts(totalCost, avgSalary);
    const comparisons = calculateComparisons(totalCost);

    setShareData({
      minutes: Math.floor(minutes),
      totalCost,
      engineeringHours: opportunityCosts.engineeringHours,
      comparison: {
        value: comparisons.coffee,
        label: 'cups of coffee',
      },
    });

    setShareModalOpen(true);
  };

  return (
    <div className="App">
      {!isRunning ? (
        <SetupScreen onStart={handleStart} onShowHistory={() => setHistoryModalOpen(true)} />
      ) : (
        <LiveCalculator
          numPeople={numPeople}
          avgSalary={avgSalary}
          startTime={startTime + pausedTime}
          isPaused={isPaused}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
          onShare={handleShare}
          onShowHistory={() => setHistoryModalOpen(true)}
        />
      )}

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        meetingData={shareData}
      />

      <MeetingHistory
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
      />
    </div>
  );
}

export default App;
