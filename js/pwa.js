const CACHE_NAME = 'marketpro-v1';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/animations.css',
  './css/responsive.css',
  './js/app.js',
  './assets/images/marketpro-icon.png'
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

const installButton = document.querySelector('[data-install-app]');
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton?.removeAttribute('hidden');
});
installButton?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installButton.setAttribute('hidden', '');
});

export { CACHE_NAME, APP_SHELL };
