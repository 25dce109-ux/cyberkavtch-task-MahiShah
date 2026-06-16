// certificate.js
// Certificate generation and verification logic.

const Certificate = (() => {
  const createId = () => `CERT-${Date.now().toString().slice(-6)}`;

  const renderPreview = (data) => {
    const preview = document.getElementById('certificatePreview');
    if (!preview) return;
    preview.innerHTML = `
      <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:16px;">
        <span class="eyebrow">Certificate ID: ${data.id}</span>
        <h3>${data.name}</h3>
        <p>has successfully completed</p>
        <strong>${data.event}</strong>
        <p>Issued on ${data.date}</p>
      </div>
    `;
  };

  const generateCertificate = () => {
    const name = document.getElementById('certName').value.trim();
    const event = document.getElementById('certEvent').value.trim();
    const template = document.getElementById('certTemplate').value.trim();
    if (!name || !event) {
      Toast.show('Participant name and event name are required.');
      return;
    }

    const certificate = {
      id: createId(),
      name,
      event,
      template,
      date: new Date().toLocaleDateString('en-IN'),
      authority: 'CyberKavach Faculty Coordinator',
    };
    Storage.saveCertificate(certificate);
    renderPreview(certificate);
    Toast.show('Certificate generated successfully.');
  };

  const verifyCertificate = () => {
    const verifyInput = document.getElementById('verifyId');
    const result = document.getElementById('verifyResult');
    if (!verifyInput || !result) return;
    const id = verifyInput.value.trim();
    if (!id) {
      result.textContent = 'Please enter a certificate ID.';
      return;
    }
    const certificate = Storage.getCertificates().find((item) => item.id === id);
    if (!certificate) {
      result.textContent = 'Invalid Certificate. Please check the ID and try again.';
      return;
    }

    result.innerHTML = `
      <strong>Name:</strong> ${certificate.name}<br>
      <strong>Event:</strong> ${certificate.event}<br>
      <strong>Date:</strong> ${certificate.date}<br>
      <strong>Authority:</strong> ${certificate.authority}
    `;
  };

  const exportPDF = async () => {
    const preview = document.getElementById('certificatePreview');
    if (!preview || preview.textContent.trim() === '' || preview.textContent.includes('preview will appear')) {
      Toast.show('Please generate a certificate first.');
      return;
    }
    try {
      Toast.show('Preparing PDF...');
      const canvas = await html2canvas(preview, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf || window.jspdf || {};
      const pdf = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const filename = (document.getElementById('certName')?.value || 'certificate').replace(/\s+/g, '_') + '_' + (new Date().toISOString().slice(0,10)) + '.pdf';
      pdf.save(filename);
      Toast.show('PDF downloaded');
    } catch (err) {
      Toast.show('PDF export failed. Try browser print.');
      console.error(err);
    }
  };

  const init = () => {
    document.getElementById('generateCert')?.addEventListener('click', generateCertificate);
    document.getElementById('verifyCert')?.addEventListener('click', verifyCertificate);
    document.getElementById('downloadCert')?.addEventListener('click', exportPDF);
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Certificate.init();
});
