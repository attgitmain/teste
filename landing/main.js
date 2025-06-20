/* main.js - interações da landing page */
document.addEventListener('DOMContentLoaded', () => {
  // carregar parciais
  document.querySelectorAll('[data-include]').forEach(async el => {
    const file = el.getAttribute('data-include');
    if (file) {
      const resp = await fetch(file);
      el.innerHTML = await resp.text();
    }
  });

  // menu mobile slide
  document.addEventListener('click', e => {
    if (e.target.closest('#btn-menu')) {
      document.getElementById('menu').classList.toggle('hidden');
      document.getElementById('menu').classList.toggle('animate-slide');
    }
  });

  // toggle faq
  document.addEventListener('toggle', e => {
    if (e.target.matches('.faq-item')) {
      e.target.classList.toggle('open');
    }
  }, true);

  AOS.init();
});
