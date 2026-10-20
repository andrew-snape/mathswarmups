// Shared helpers used across all activity pages.

function toggleFullscreen(el) {
  const target = el || document.documentElement;
  if (!document.fullscreenElement) {
    (target.requestFullscreen || target.webkitRequestFullscreen || function () {}).call(target);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('fullscreen-toggle');
  if (!btn) return;
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
    btn.hidden = true; // e.g. iPhone Safari has no fullscreen for pages
    return;
  }
  const page = document.querySelector('.activity-page') || document.documentElement;
  const sync = () => {
    const on = document.fullscreenElement || document.webkitFullscreenElement;
    btn.textContent = on ? '⛶ Exit fullscreen' : '⛶ Fullscreen';
  };
  btn.addEventListener('click', () => toggleFullscreen(page));
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('webkitfullscreenchange', sync);
});

// Small utility: random integer in [min, max] inclusive.
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random item from an array.
function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// Fisher-Yates shuffle (returns a new array).
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
