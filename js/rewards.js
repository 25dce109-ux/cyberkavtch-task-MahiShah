// rewards.js
// Rewards, leaderboard and achievement system.

const Rewards = (() => {
  const init = () => {
    const leaderboardRows = document.querySelectorAll('.leaderboard-section tbody tr');
    leaderboardRows.forEach((row, index) => {
      const badge = document.createElement('span');
      badge.className = 'badge';
      if (index === 0) { badge.classList.add('badge-gold'); badge.textContent = 'Gold'; }
      if (index === 1) { badge.classList.add('badge-silver'); badge.textContent = 'Silver'; }
      if (index === 2) { badge.classList.add('badge-bronze'); badge.textContent = 'Bronze'; }
      if (badge.textContent) {
        row.children[1].appendChild(badge);
      }
    });
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Rewards.init();
});
