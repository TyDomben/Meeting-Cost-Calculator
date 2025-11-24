# 💰 Meeting Cost Calculator

A real-time tool that calculates and displays how much a meeting is costing your company as it happens. Clean, minimal interface with escalating numbers that create subtle awareness about meeting efficiency.

**Make every meeting count. Literally.**

## Features

- **Real-time Cost Tracking**: Watch the dollars accumulate second by second
- **Multiple Perspectives on Waste**:
  - Dollar amounts with employer overhead
  - Engineering hours
  - Opportunity costs (features, bugs, code that could've been written)
  - Absurd comparisons (coffee cups, iPhones, Netflix subscriptions)
- **Preset Configurations**: Quick setup for common team types
- **Pause/Resume Functionality**: Account for breaks in meetings
- **Share Screenshots**: Generate shareable cost reports
- **Meeting History**: Track your meetings in localStorage
- **Browser Tab Updates**: See the cost even when tabbed out
- **Efficiency Ratings**: Get rated on whether this should've been an email

## Tech Stack

- **React** - UI and state management
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **html2canvas** - Screenshot generation
- **LocalStorage** - Meeting history persistence

## Getting Started

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

## How It Works

### Calculation Logic

The calculator uses industry-standard formulas:

1. **Base hourly rate**: Annual Salary ÷ 2,080 work hours
2. **Per-minute rate**: Hourly Rate ÷ 60
3. **Meeting cost/minute**: Per-minute Rate × Number of People
4. **Actual cost**: Total Cost × 1.4 (includes 40% overhead for benefits, equipment, etc.)

### Opportunity Cost Calculations

- **Engineering hours**: Based on actual hourly rates
- **Features**: Estimated at $800 per feature
- **Bug fixes**: Estimated at $110 per fix
- **Lines of code**: Estimated at $3 per line
- **Pull requests**: Estimated at $170 per review

### Efficiency Ratings

- 🟢 **Acceptable**: < 15 minutes
- 🟡 **Moderate**: < 30 min, < $500
- 🟠 **Questionable**: < 45 min, < $1000
- 🔴 **Poor**: Everything else (should've been an email)

## Usage

1. Enter meeting details:
   - Number of attendees
   - Average salary (or select a preset)
   - When the meeting started

2. Watch the cost accumulate in real-time

3. Use controls:
   - **Pause**: Stop the timer during breaks
   - **Resume**: Continue tracking
   - **Reset**: Start over (saves to history)
   - **Share**: Generate and download/copy screenshot

## Presets

- **Startup**: 5 people, $75k average
- **Tech Company**: 8 people, $120k average
- **Enterprise**: 12 people, $95k average
- **Executives**: 5 people, $200k average
- **Mixed Team**: 7 people, $110k average
- **All-Hands**: 50 people, $110k average

## Professional Use

This tool is designed to be:
- Professional enough for corporate settings
- Data-driven (no overt snark)
- Shareable on company Slack/Teams
- Effective at encouraging meeting efficiency

The numbers speak for themselves. No need for jokes when the accumulating dollars create the message.

## License

MIT

---

**Could this have been an email?** 📧
