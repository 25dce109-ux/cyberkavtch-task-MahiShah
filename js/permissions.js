// permissions.js
// Simple client-side role gating: hide elements with `data-role` attribute
(function(){
  const user = Storage.getCurrentUser();
  const role = user?.role || null;
  document.querySelectorAll('[data-role]').forEach(el => {
    const allowed = el.getAttribute('data-role') || '';
    const allowList = allowed.split(',').map(s=>s.trim()).filter(Boolean);
    if (!role || (allowList.length && !allowList.includes(role))) {
      el.style.display = 'none';
    }
  });
})();
