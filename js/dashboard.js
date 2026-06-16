// dashboard.js
// Shared dashboard behavior for CyberKavach.

const Dashboard = (() => {
  const initCounters = () => {
    const animatedItems = document.querySelectorAll('.count');
    animatedItems.forEach((item) => {
      const target = Number(item.dataset.target) || 0;
      let current = 0;
      const duration = 1600;
      const step = Math.max(1, Math.floor(target / (duration / 30)));
      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          item.textContent = target + (target >= 1000 ? '+' : '');
          clearInterval(counter);
        } else {
          item.textContent = current;
        }
      }, 30);
    });
  };

  const initChat = () => {
    const chatWidget = document.getElementById('chatWidget');
    const openChat = document.getElementById('openChat');
    const closeChat = document.getElementById('closeChat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    const replies = {
      approvals: 'The approval workflow allows members to send requests through coordinator review up to faculty confirmation.',
      events: 'You can create events, manage team registrations and track seat availability here.',
      certificate: 'Certificates are generated with an ID and previewed for download. They are saved locally in your browser.',
      attendance: 'Use check-in and check-out controls to maintain attendance history with live counts.',
      settings: 'Settings let you choose dark or light mode and store preferences using Local Storage.',
    };

    openChat?.addEventListener('click', () => chatWidget?.classList.toggle('active'));
    closeChat?.addEventListener('click', () => chatWidget?.classList.remove('active'));

    chatForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      const userMessage = document.createElement('div');
      userMessage.className = 'chat-message user';
      userMessage.textContent = text;
      chatMessages.appendChild(userMessage);
      chatInput.value = '';

      const answer = Object.entries(replies).find(([keyword]) => text.toLowerCase().includes(keyword));
      const response = answer ? replies[answer[0]] : 'CyberBot is here to help. Try asking about approvals, events, certificates or attendance.';
      const botMessage = document.createElement('div');
      botMessage.className = 'chat-message bot';
      botMessage.textContent = response;
      setTimeout(() => chatMessages.appendChild(botMessage), 400);
    });
  };

  const initOverlay = () => {
    const notifyBtn = document.getElementById('notifyBtn');
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
      <div class="notification-header">
        <h3>Notifications</h3>
        <button class="close-notifications" aria-label="Close notifications">×</button>
      </div>
      <div class="notification-list">
        <div class="notification-item"><strong>Approval Update</strong><span>Budget request approved by Faculty.</span></div>
        <div class="notification-item"><strong>Event Reminder</strong><span>Cyber Workshop starts in 2 hours.</span></div>
        <div class="notification-item"><strong>Certificate Ready</strong><span>Certificate generated for Team Hydra.</span></div>
      </div>
    `;
    document.body.appendChild(panel);

    notifyBtn?.addEventListener('click', () => {
      panel.classList.toggle('visible');
      Toast.show('Notifications panel opened.');
    });

    panel.querySelector('.close-notifications')?.addEventListener('click', () => {
      panel.classList.remove('visible');
    });
  };

  const init = () => {
    uiHelpers.initCommon();
    initCounters();
    initChat();
    initOverlay();
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
});
