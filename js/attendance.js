// attendance.js
// Attendance simulation and CSV export.

const Attendance = (() => {
  const updateCounts = (records) => {
    const checkedIn = records.filter((item) => item.status === 'Checked In').length;
    const checkedOut = records.filter((item) => item.status === 'Checked Out').length;
    const total = records.length;
    const pending = Math.max(0, total - checkedIn);
    document.getElementById('checkedInCount').textContent = checkedIn;
    document.getElementById('checkedOutCount').textContent = checkedOut;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('totalParticipants').textContent = total;
  };

  const renderTable = (records) => {
    const tbody = document.querySelector('#attendanceTable tbody');
    if (!tbody) return;
    if (!records.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:32px;">No attendance records yet. Use check-in to start logging participation.</td></tr>';
      return;
    }
    tbody.innerHTML = records.map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.event}</td>
        <td>${item.checkIn || '-'}</td>
        <td>${item.checkOut || '-'}</td>
        <td>${item.status}</td>
      </tr>
    `).join('');
  };

  const getRecords = () => Storage.getAttendance();

  const createRecord = (action) => {
    const records = getRecords();
    const name = `Member ${records.length + 1}`;
    const event = 'Cyber Event';
    const now = new Date().toLocaleTimeString('en-IN');
    const record = {
      id: `ATT-${Date.now().toString().slice(-5)}`,
      name,
      event,
      checkIn: action === 'checkin' ? now : '',
      checkOut: action === 'checkout' ? now : '',
      status: action === 'checkin' ? 'Checked In' : 'Checked Out',
    };
    records.push(record);
    Storage.saveAttendance(records);
    return records;
  };

  const exportCSV = () => {
    const records = getRecords();
    if (!records.length) {
      Toast.show('No attendance records available for export.');
      return;
    }
    const csv = ['Name,Event,Check In,Check Out,Status', ...records.map((item) => `${item.name},${item.event},${item.checkIn},${item.checkOut},${item.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const init = () => {
    const records = getRecords();
    renderTable(records);
    updateCounts(records);
    document.getElementById('checkInBtn')?.addEventListener('click', () => {
      const newRecords = createRecord('checkin');
      renderTable(newRecords);
      updateCounts(newRecords);
      Toast.show('Check-in recorded successfully.');
    });
    document.getElementById('checkOutBtn')?.addEventListener('click', () => {
      const newRecords = createRecord('checkout');
      renderTable(newRecords);
      updateCounts(newRecords);
      Toast.show('Check-out recorded successfully.');
    });
    document.getElementById('exportAttendance')?.addEventListener('click', exportCSV);
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Attendance.init();
});
