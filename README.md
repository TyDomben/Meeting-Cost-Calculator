# 💰 Meeting Cost Calculator

A real-time tool that calculates and displays how much a meeting is costing your company as it happens. Clean, minimal interface with escalating numbers that create subtle awareness about meeting efficiency.

**Make every meeting count. Literally.**

![Meeting Cost Calculator](https://img.shields.io/badge/License-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

## ✨ Features

### Core Functionality
- **⏱️ Real-time Cost Tracking**: Watch the dollars accumulate second by second with smooth animations
- **💼 Multiple Perspectives on Waste**:
  - Dollar amounts with employer overhead (40%)
  - Engineering hours calculated from actual rates
  - Opportunity costs (features, bugs, code, PR reviews)
  - Rotating comparisons (coffee, iPhones, Netflix, Spotify, movies, pizza)
- **🎯 Smart Preset Configurations**: 6 team presets (Startup, Tech, Enterprise, Executive, Mixed, All-Hands)
- **⏸️ Pause/Resume Functionality**: Account for breaks in meetings
- **📸 Enhanced Share Feature**: Generate beautiful, shareable cost reports with one click
- **📊 Meeting History Viewer**: Track all meetings with statistics (total cost, monthly cost)
- **📥 CSV Export**: Export meeting history to CSV for analysis
- **🏆 Efficiency Ratings**: Real-time ratings based on duration and cost

### UX Enhancements
- **⌨️ Keyboard Shortcuts**:
  - `Space` - Pause/Resume
  - `H` - View history
  - `Ctrl+S` or `Cmd+S` - Share
  - `Ctrl+R` or `Cmd+R` - Reset
  - `Esc` - Close modals
- **💡 Interactive Tooltips**: Hover over metrics to learn how they're calculated
- **🎨 Polished Animations**: Smooth transitions, fade-ins, and pulse effects
- **♿ Accessibility**: Full ARIA labels, keyboard navigation, and focus states
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **🖥️ Browser Tab Updates**: See the cost even when tabbed out

## 🛠️ Tech Stack

- **React 18** - Modern UI with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **html2canvas** - Screenshot generation
- **LocalStorage API** - Meeting history persistence

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📐 How It Works

### Calculation Logic

The calculator uses industry-standard formulas to ensure accuracy:

1. **Base hourly rate**: Annual Salary ÷ 2,080 work hours
2. **Per-minute rate**: Hourly Rate ÷ 60
3. **Meeting cost/minute**: Per-minute Rate × Number of People
4. **Actual cost**: Total Cost × 1.4 (includes 40% overhead for benefits, equipment, office space)

### Opportunity Cost Calculations

All estimates based on industry averages:

- **Engineering hours**: Calculated from actual hourly rates with overhead
- **Features**: $800 per feature
- **Bug fixes**: $110 per fix
- **Lines of code**: $3 per line
- **Pull request reviews**: $170 per review

### Efficiency Ratings

Dynamic ratings based on meeting duration and cost:

- 🟢 **Acceptable**: < 15 minutes - "Short and sweet"
- 🟡 **Moderate**: < 30 min, < $500 - "Could this be an email?"
- 🟠 **Questionable**: < 45 min, < $1000 - "Are decisions being made?"
- 🔴 **Poor**: Everything else - "This should definitely have been an email"

## 💡 Usage

### Starting a Meeting

1. Enter meeting details:
   - Number of attendees (1-1000)
   - Average salary ($30k-$500k) or select a preset
   - When the meeting started (now or X minutes ago)
2. Click "Start Calculating"

### During the Meeting

- Watch the cost accumulate in real-time
- Use controls:
  - **Pause** (Space): Stop the timer during breaks
  - **Resume** (Space): Continue tracking
  - **Reset** (Ctrl+R): Start over (auto-saves to history)
  - **Share** (Ctrl+S): Generate shareable report
  - **History** (H): View past meetings

### After the Meeting

- Share the report on Slack/Teams
- Review efficiency rating
- Check meeting history for patterns
- Export data to CSV for analysis

## 🎭 Presets

| Preset | Attendees | Avg Salary | Emoji |
|--------|-----------|------------|-------|
| Startup | 5 | $75k | 🚀 |
| Tech Company | 8 | $120k | 💻 |
| Enterprise | 12 | $95k | 🏢 |
| Executives | 5 | $200k | 👔 |
| Mixed Team | 7 | $110k | 👥 |
| All-Hands | 50 | $110k | 🎯 |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Pause/Resume timer |
| `H` | Open meeting history |
| `Ctrl/Cmd + S` | Open share modal |
| `Ctrl/Cmd + R` | Reset (with confirmation) |
| `Esc` | Close modals |

## 📊 Meeting History

- Automatically saves completed meetings
- Stores last 10 meetings
- View statistics:
  - Total meetings tracked
  - All-time cost
  - Last 30 days cost
- Export to CSV for analysis
- Clear history option

## 🎯 Professional Use

This tool is designed to be:
- **Professional** enough for corporate settings
- **Data-driven** with no overt snark
- **Shareable** on company Slack/Teams channels
- **Effective** at encouraging meeting efficiency

The numbers speak for themselves. No need for jokes when accumulating dollars create the message.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SetupScreen.jsx        # Initial configuration
│   ├── LiveCalculator.jsx     # Real-time display
│   ├── ShareModal.jsx         # Screenshot generation
│   ├── MeetingHistory.jsx     # History viewer
│   └── Tooltip.jsx           # Reusable tooltips
├── utils/
│   ├── calculations.js        # All cost formulas
│   ├── constants.js          # App constants & config
│   ├── storage.js            # localStorage helpers
│   └── export.js             # CSV export utilities
├── App.jsx                   # Main app with state & shortcuts
├── index.css                 # Global styles & animations
└── main.jsx                  # App entry point
```

## 🎨 Design Philosophy

- **Minimal**: Clean interface, let the data speak
- **Professional**: Suitable for corporate environments
- **Subtle**: Passive-aggressive through data, not copy
- **Accessible**: Keyboard navigation, ARIA labels, focus states
- **Responsive**: Works on all screen sizes
- **Delightful**: Smooth animations and interactions

## 🤝 Contributing

Contributions are welcome! This is a simple, focused tool - please keep PRs aligned with the core mission of making people reconsider unnecessary meetings.

## 📄 License

MIT

---

## 🎯 Success Metrics

You know it's working when:
- ✅ Someone opens it in a meeting and shows their screen
- ✅ The numbers make people uncomfortable (in a good way)
- ✅ Someone says "okay let's wrap this up"
- ✅ Gets shared on company Slack with 👀 reactions
- ✅ Managers start referencing it to cut meetings
- ✅ Screenshots go viral on Twitter/LinkedIn
- ✅ Becomes the passive-aggressive meeting killer

---

**Could this have been an email?** 📧

*Built with ❤️ and a healthy disdain for unnecessary meetings.*
