// storage.js
// Central Local Storage helper functions for CyberKavach.
const Storage = (() => {
  const USERS_KEY = 'cyberkavach_users';
  const CERTS_KEY = 'cyberkavach_certificates';
  const EVENTS_KEY = 'cyberkavach_events';
  const ATTENDANCE_KEY = 'cyberkavach_attendance';
  const SETTINGS_KEY = 'cyberkavach_settings';

  const read = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      return [];
    }
  };

  const write = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getUsers = () => {
    const users = read(USERS_KEY);
    if (!users.length) {
      const defaultUsers = [
        { name: 'Admin Faculty', email: 'faculty@cyberkavach.com', department: 'Administration', role: 'Faculty Coordinator', password: 'Faculty123' },
        { name: 'Student Lead', email: 'student@cyberkavach.com', department: 'Student Affairs', role: 'Student Coordinator', password: 'Student123' },
      ];
      write(USERS_KEY, defaultUsers);
      return defaultUsers;
    }
    return users;
  };

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    write(USERS_KEY, users);
  };

  const getCertificates = () => read(CERTS_KEY);
  const saveCertificate = (certificate) => {
    const certs = getCertificates();
    certs.push(certificate);
    write(CERTS_KEY, certs);
  };

  const getEvents = () => read(EVENTS_KEY);
  const saveEvents = (events) => write(EVENTS_KEY, events);

  const getAttendance = () => read(ATTENDANCE_KEY);
  const saveAttendance = (records) => write(ATTENDANCE_KEY, records);

  const getSettings = () => {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return settings || { theme: 'dark', notifications: { email: true, push: true } };
  };
  const saveSettings = (settings) => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  // Current user helpers (session or local depending on remember)
  const setCurrentUser = (user, remember = false) => {
    if (remember) localStorage.setItem('cyberkavach_current_user', JSON.stringify(user));
    else sessionStorage.setItem('cyberkavach_current_user', JSON.stringify(user));
  };

  const getCurrentUser = () => {
    try {
      const s = sessionStorage.getItem('cyberkavach_current_user');
      if (s) return JSON.parse(s);
      const l = localStorage.getItem('cyberkavach_current_user');
      if (l) return JSON.parse(l);
      return null;
    } catch (e) { return null; }
  };

  const clearCurrentUser = () => {
    sessionStorage.removeItem('cyberkavach_current_user');
    localStorage.removeItem('cyberkavach_current_user');
  };

  const userHasRole = (allowed) => {
    const user = getCurrentUser();
    if (!user) return false;
    if (typeof allowed === 'string') return user.role === allowed;
    if (Array.isArray(allowed)) return allowed.includes(user.role);
    return false;
  };

  return {
    getUsers,
    saveUser,
    getCertificates,
    saveCertificate,
    getEvents,
    saveEvents,
    getAttendance,
    saveAttendance,
    getSettings,
    saveSettings,
    setCurrentUser,
    getCurrentUser,
    clearCurrentUser,
    userHasRole,
  };
})();

const Toast = (() => {
  const toast = document.getElementById('toast');
  let timeoutId = null;
  const show = (message, duration = 2600) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => toast.classList.remove('show'), duration);
  };
  return { show };
})();

const uiHelpers = (() => {
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  };

  const scrollProgress = () => {
    const progress = document.getElementById('progressBar');
    if (!progress) return;
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const width = height ? (scroll / height) * 100 : 0;
    progress.style.width = `${Math.min(width, 100)}%`;
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initCommon = () => {
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const nav = document.getElementById('mainNav');
        nav?.classList.toggle('open');
      });
    }

    const sidebarToggle = document.querySelectorAll('.sidebar-toggle');
    sidebarToggle.forEach((button) => button.addEventListener('click', toggleSidebar));

    const backTop = document.getElementById('backTop');
    backTop?.addEventListener('click', backToTop);

    window.addEventListener('scroll', scrollProgress);
    scrollProgress();
    const settings = Storage.getSettings();
    if (settings.theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return { initCommon, toggleSidebar, backToTop };
})();
