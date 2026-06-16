// analytics.js
// Analytics charts for CyberKavach using Chart.js.

const Analytics = (() => {
  const createChart = (ctx, type, data, options = {}) => new Chart(ctx, { type, data, options });

  const initCharts = () => {
    const eventCtx = document.getElementById('eventGrowthChart');
    const attendanceCtx = document.getElementById('attendanceChart');
    const approvalCtx = document.getElementById('approvalChart');
    const certificateCtx = document.getElementById('certificateChart');
    const contributionCtx = document.getElementById('contributionChart');

    if (eventCtx) {
      createChart(eventCtx, 'line', {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{ label: 'Events', data: [14, 18, 22, 28, 35, 42], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.18)', tension: 0.4, fill: true }],
      });
    }

    if (attendanceCtx) {
      createChart(attendanceCtx, 'bar', {
        labels: ['Workshop','Hackathon','Meetup','Webinar','Training'],
        datasets: [{ label: 'Attendance %', data: [92, 84, 76, 89, 82], backgroundColor: '#60a5fa' }],
      });
    }

    if (approvalCtx) {
      createChart(approvalCtx, 'doughnut', {
        labels: ['Approved','Pending','Review','Rejected'],
        datasets: [{ data: [45, 18, 12, 5], backgroundColor: ['#22c55e','#facc15','#38bdf8','#ef4444'] }],
      });
    }

    if (certificateCtx) {
      createChart(certificateCtx, 'radar', {
        labels: ['Issued','Verified','Pending','Drafts','Renewed'],
        datasets: [{ label: 'Certificates', data: [80, 72, 20, 14, 38], backgroundColor: 'rgba(56,189,248,0.22)', borderColor: '#38bdf8', pointBackgroundColor: '#fff' }],
      });
    }

    if (contributionCtx) {
      createChart(contributionCtx, 'line', {
        labels: ['Week 1','Week 2','Week 3','Week 4'],
        datasets: [{ label: 'Member Points', data: [110, 160, 210, 270], borderColor: '#7dd3fc', backgroundColor: 'rgba(125,211,252,0.16)', tension: 0.3, fill: true }],
      });
    }
  };

  const exportCSV = () => {
    const events = Storage.getEvents() || [];
    const attendance = Storage.getAttendance() || [];
    const certs = Storage.getCertificates() || [];
    const totalEvents = events.length;
    const certificatesIssued = certs.length;
    const approvalsCompleted = 0; // approvals dataset not centralized; placeholder
    const attendanceRate = attendance.length ? Math.round((attendance.filter(a=>a.present).length / attendance.length) * 100) + '%' : 'N/A';
    const contributionScore = 0; // placeholder

    const csvRows = [
      'Metric,Value',
      `Total Events,${totalEvents}`,
      `Attendance Rate,${attendanceRate}`,
      `Approvals Completed,${approvalsCompleted}`,
      `Certificates Issued,${certificatesIssued}`,
      `Contribution Score,${contributionScore}`
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'analytics.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const init = () => {
    initCharts();
    document.getElementById('exportCSV')?.addEventListener('click', exportCSV);
    document.getElementById('exportPDF')?.addEventListener('click', () => {
      Toast.show('PDF export simulated. Use browser print to save the current view.');
    });
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Analytics.init();
});
