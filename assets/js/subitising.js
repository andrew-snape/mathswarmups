(function () {
  const maxSelect = document.getElementById('sb-max');
  const arrangementSelect = document.getElementById('sb-arrangement');
  const durationSelect = document.getElementById('sb-duration');
  const flashBtn = document.getElementById('sb-flash');
  const revealBtn = document.getElementById('sb-reveal');
  const stage = document.getElementById('sb-stage');
  const svg = document.getElementById('sb-svg');
  const countEl = document.getElementById('sb-count');

  const NS = 'http://www.w3.org/2000/svg';
  const VB_W = 600, VB_H = 400;
  const DOT_COLOR = '#ffcc33';
  const FRAME_COLOR = '#4fd1c5';

  // Standard dice pip layouts, as fractional [x,y] within a unit square.
  const PIP_LAYOUTS = {
    1: [[0.5, 0.5]],
    2: [[0.2, 0.2], [0.8, 0.8]],
    3: [[0.2, 0.2], [0.5, 0.5], [0.8, 0.8]],
    4: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]],
    5: [[0.2, 0.2], [0.8, 0.2], [0.5, 0.5], [0.2, 0.8], [0.8, 0.8]],
    6: [[0.2, 0.15], [0.2, 0.5], [0.2, 0.85], [0.8, 0.15], [0.8, 0.5], [0.8, 0.85]],
  };

  let currentCount = 0;
  let hideTimer = null;

  function clearSvg() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }

  function circle(cx, cy, r, fill) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r', r);
    c.setAttribute('fill', fill);
    return c;
  }

  function rect(x, y, w, h, opts) {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y);
    r.setAttribute('width', w);
    r.setAttribute('height', h);
    Object.entries(opts || {}).forEach(([k, v]) => r.setAttribute(k, v));
    return r;
  }

  function splitIntoDice(n) {
    const numDice = Math.max(1, Math.ceil(n / 6));
    const base = Math.floor(n / numDice);
    let remainder = n - base * numDice;
    const values = [];
    for (let i = 0; i < numDice; i++) {
      values.push(base + (remainder > 0 ? 1 : 0));
      if (remainder > 0) remainder--;
    }
    return values;
  }

  function drawDicePattern(n) {
    const values = splitIntoDice(n);
    const gap = 20;
    const boxSize = Math.min(180, (VB_W - gap * (values.length + 1)) / values.length);
    const totalWidth = values.length * boxSize + (values.length - 1) * gap;
    let startX = (VB_W - totalWidth) / 2;
    const y = (VB_H - boxSize) / 2;

    values.forEach((v) => {
      const pad = boxSize * 0.15;
      const inner = boxSize - pad * 2;
      svg.appendChild(rect(startX, y, boxSize, boxSize, {
        rx: 16, fill: 'none', stroke: FRAME_COLOR, 'stroke-width': 3,
      }));
      (PIP_LAYOUTS[v] || PIP_LAYOUTS[6]).forEach(([fx, fy]) => {
        svg.appendChild(circle(startX + pad + fx * inner, y + pad + fy * inner, boxSize * 0.09, DOT_COLOR));
      });
      startX += boxSize + gap;
    });
  }

  function drawRandomScatter(n) {
    const r = 22;
    const placed = [];
    const marginX = 60, marginY = 40;
    for (let i = 0; i < n; i++) {
      let x, y, tries = 0, ok = false;
      while (tries < 400 && !ok) {
        x = randInt(marginX, VB_W - marginX);
        y = randInt(marginY, VB_H - marginY);
        ok = placed.every(p => Math.hypot(p[0] - x, p[1] - y) > r * 2.1);
        tries++;
      }
      placed.push([x, y]);
      svg.appendChild(circle(x, y, r, DOT_COLOR));
    }
  }

  function drawTenFrame(n) {
    const frames = n > 10 ? 2 : 1;
    const cols = 5, rows = 2;
    const cell = 64, gap = 6;
    const frameW = cols * cell + (cols - 1) * gap;
    const frameH = rows * cell + (rows - 1) * gap;
    const frameGap = 40;
    const totalWidth = frames * frameW + (frames - 1) * frameGap;
    let startX = (VB_W - totalWidth) / 2;
    const startY = (VB_H - frameH) / 2;
    let remaining = n;

    for (let f = 0; f < frames; f++) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = startX + col * (cell + gap);
          const y = startY + row * (cell + gap);
          svg.appendChild(rect(x, y, cell, cell, { rx: 8, fill: 'none', stroke: FRAME_COLOR, 'stroke-width': 3 }));
          if (remaining > 0) {
            svg.appendChild(circle(x + cell / 2, y + cell / 2, cell * 0.32, DOT_COLOR));
            remaining--;
          }
        }
      }
      startX += frameW + frameGap;
    }
  }

  function render(n) {
    clearSvg();
    const arrangement = arrangementSelect.value;
    if (arrangement === 'dice') drawDicePattern(n);
    else if (arrangement === 'ten-frame') drawTenFrame(n);
    else drawRandomScatter(n);
  }

  function showStage() {
    stage.classList.remove('blank');
    svg.style.display = '';
    countEl.style.display = 'none';
  }

  function hideStage() {
    stage.classList.add('blank');
    svg.style.display = 'none';
    countEl.style.display = 'none';
  }

  function flash() {
    clearTimeout(hideTimer);
    const max = parseInt(maxSelect.value, 10);
    currentCount = randInt(1, max);
    render(currentCount);
    showStage();
    const duration = parseInt(durationSelect.value, 10);
    if (duration > 0) {
      hideTimer = setTimeout(hideStage, duration);
    }
  }

  function reveal() {
    if (stage.classList.contains('blank') || svg.style.display === 'none') {
      clearTimeout(hideTimer);
      render(currentCount);
      showStage();
      countEl.textContent = currentCount;
      countEl.style.display = '';
    } else {
      countEl.textContent = currentCount;
      countEl.style.display = countEl.style.display === 'none' ? '' : 'none';
    }
  }

  flashBtn.addEventListener('click', flash);
  revealBtn.addEventListener('click', reveal);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); flash(); }
    if (e.key === 'r' || e.key === 'R') reveal();
  });

  hideStage();
})();
