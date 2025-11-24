// Export utilities for meeting data

/**
 * Export meeting history to CSV file
 * @param {Array} history - Array of meeting objects
 */
export function exportHistoryToCSV(history) {
  if (!history || history.length === 0) {
    alert('No meeting history to export');
    return;
  }

  // CSV headers
  const headers = ['Date', 'Time', 'Attendees', 'Duration (min)', 'Avg Salary', 'Total Cost'];

  // Convert history to CSV rows
  const rows = history.map(meeting => {
    const date = new Date(meeting.timestamp);
    const dateStr = date.toLocaleDateString('en-US');
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return [
      dateStr,
      timeStr,
      meeting.numPeople,
      meeting.minutes,
      `$${meeting.avgSalary}`,
      `$${meeting.totalCost.toFixed(2)}`,
    ];
  });

  // Calculate totals
  const totalCost = history.reduce((sum, m) => sum + m.totalCost, 0);
  const totalMinutes = history.reduce((sum, m) => sum + m.minutes, 0);
  const avgAttendees = (history.reduce((sum, m) => sum + m.numPeople, 0) / history.length).toFixed(1);

  // Add summary rows
  rows.push([]);
  rows.push(['Summary', '', '', '', '', '']);
  rows.push(['Total Meetings', history.length, '', '', '', '']);
  rows.push(['Total Duration', '', '', totalMinutes, '', '']);
  rows.push(['Avg Attendees', avgAttendees, '', '', '', '']);
  rows.push(['Total Cost', '', '', '', '', `$${totalCost.toFixed(2)}`]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const filename = `meeting-history-${new Date().toISOString().split('T')[0]}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export current meeting snapshot to CSV
 * @param {Object} meetingData - Current meeting data
 */
export function exportCurrentMeetingToCSV(meetingData) {
  const { numPeople, avgSalary, minutes, totalCost, costPerMinute, costPerPerson, opportunityCosts } = meetingData;

  const headers = ['Metric', 'Value'];
  const rows = [
    ['Meeting Date', new Date().toLocaleString('en-US')],
    ['Number of Attendees', numPeople],
    ['Average Salary', `$${avgSalary}`],
    ['Duration (minutes)', minutes],
    [''],
    ['Total Cost', `$${totalCost.toFixed(2)}`],
    ['Cost Per Minute', `$${costPerMinute.toFixed(2)}`],
    ['Cost Per Person', `$${costPerPerson.toFixed(2)}`],
    [''],
    ['Engineering Hours', opportunityCosts.engineeringHours],
    ['Features', opportunityCosts.features],
    ['Bug Fixes', opportunityCosts.bugs],
    ['Lines of Code', opportunityCosts.linesOfCode],
    ['Pull Requests', opportunityCosts.pullRequests],
  ];

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const filename = `meeting-report-${new Date().toISOString().split('T')[0]}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
