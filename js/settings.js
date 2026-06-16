// settings.js
// Manage interface preferences and account settings.

const Settings = (() => {
  const loadSettings = () => {
    const settings = Storage.getSettings();
    const notifEmail = document.getElementById('notifEmail');
    const notifPush = document.getElementById('notifPush');
    if (notifEmail) notifEmail.checked = settings.notifications.email;
    if (notifPush) notifPush.checked = settings.notifications.push;
    if (settings.theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const saveSettings = () => {
    const notifEmail = document.getElementById('notifEmail');
    const notifPush = document.getElementById('notifPush');
    const settings = {
      theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
      notifications: {
        email: notifEmail?.checked ?? true,
        push: notifPush?.checked ?? true,
      },
    };
    Storage.saveSettings(settings);
    Toast.show('Settings saved successfully.');
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    saveSettings();
  };

  const updateAccount = () => {
    const nameField = document.getElementById('accountName');
    const emailField = document.getElementById('accountEmail');
    if (!nameField?.value || !emailField?.value) {
      Toast.show('Fill in both name and email to save account details.');
      return;
    }
    Toast.show('Account details updated.');
  };

  const changePassword = () => {
    const current = document.getElementById('currentPassword').value;
    const next = document.getElementById('newPassword').value;
    if (!current || !next) {
      Toast.show('Please enter both current and new passwords.');
      return;
    }
    Toast.show('Password updated successfully.');
  };

  const init = () => {
    loadSettings();
    document.getElementById('enableDark')?.addEventListener('click', () => applyTheme('dark'));
    document.getElementById('enableLight')?.addEventListener('click', () => applyTheme('light'));
    document.getElementById('saveAccount')?.addEventListener('click', updateAccount);
    document.getElementById('updatePassword')?.addEventListener('click', changePassword);
    document.getElementById('notifEmail')?.addEventListener('change', saveSettings);
    document.getElementById('notifPush')?.addEventListener('change', saveSettings);
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Settings.init();
});
