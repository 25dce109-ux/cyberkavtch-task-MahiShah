// auth.js
// User registration and login logic for CyberKavach.

const Auth = (() => {
  const getUserByEmail = (email) => Storage.getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());

  const showError = (element, message) => {
    if (!element) return;
    element.textContent = message;
    setTimeout(() => { element.textContent = ''; }, 3500);
  };

  const validateEmail = (email) => email.includes('@') && email.includes('.');

  const registerHandler = () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const department = document.getElementById('registerDepartment').value.trim();
      const role = document.getElementById('registerRole').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;
      const errorElement = document.getElementById('registerError');

      if (!name || !email || !department || !role || !password || !confirmPassword) {
        showError(errorElement, 'Please fill all fields before registering.');
        return;
      }
      if (!validateEmail(email)) {
        showError(errorElement, 'Enter a valid email address.');
        return;
      }
      if (getUserByEmail(email)) {
        showError(errorElement, 'A user with that email already exists.');
        return;
      }
      if (password.length < 6) {
        showError(errorElement, 'Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        showError(errorElement, 'Passwords do not match.');
        return;
      }

      Storage.saveUser({ name, email, department, role, password });
      Toast.show('Registration successful. Redirecting to login...');
      setTimeout(() => { window.location.href = 'login.html'; }, 1400);
    });
  };

  const loginHandler = () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const role = document.getElementById('loginRole').value;
      const remember = document.getElementById('rememberMe').checked;
      const errorElement = document.getElementById('loginError');

      if (!email || !password || !role) {
        showError(errorElement, 'Complete all fields to continue.');
        return;
      }
      const user = getUserByEmail(email);
      if (!user || user.password !== password || user.role !== role) {
        showError(errorElement, 'Login failed. Check your credentials and role.');
        return;
      }

      if (remember) {
        localStorage.setItem('cyberkavach_current_user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('cyberkavach_current_user', JSON.stringify(user));
      }

      Toast.show('Login successful. Redirecting now...');
      setTimeout(() => {
        const route = {
          'Faculty Coordinator': 'pages/dashboard-faculty.html',
          'Student Coordinator': 'pages/dashboard-student.html',
          'Tech Coordinator': 'pages/dashboard-tech.html',
          'Content Coordinator': 'pages/dashboard-content.html',
          'Social Media Coordinator': 'pages/dashboard-social.html',
          'Club Member': 'pages/dashboard-member.html',
          'Student/Guest': 'pages/dashboard-guest.html',
        }[role] || 'pages/dashboard-member.html';
        window.location.href = route;
      }, 1200);
    });

    const toggleLogin = document.getElementById('toggleLoginPassword');
    const toggleRegister = document.getElementById('toggleRegisterPassword');
    const toggleConfirm = document.getElementById('toggleConfirmPassword');

    const togglePassword = (buttonId, inputId) => {
      const button = document.getElementById(buttonId);
      const input = document.getElementById(inputId);
      button?.addEventListener('click', () => {
        if (!input) return;
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
      });
    };

    togglePassword('toggleLoginPassword', 'loginPassword');
    togglePassword('toggleRegisterPassword', 'registerPassword');
    togglePassword('toggleConfirmPassword', 'registerConfirmPassword');
  };

  const init = () => {
    registerHandler();
    loginHandler();
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
