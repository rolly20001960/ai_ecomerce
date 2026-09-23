const CACHE_NAME = 'marketpro-v3';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/animations.css',
  './css/responsive.css',
  './js/app.js',
  './js/pwa.js',
  './manifest.webmanifest',
  './assets/images/marketpro-icon.png'
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      await registration.update();

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    } catch {
      // PWA support is optional; the site remains fully usable without it.
    }
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const checkForUpdates = () => registration.update();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdates();
  });
  window.addEventListener('pageshow', checkForUpdates);
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
