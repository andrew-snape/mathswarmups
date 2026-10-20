(function () {
  const rangeSelect = document.getElementById('tf-range');
  const hideLabelCheckbox = document.getElementById('tf-hide-label');
  const newBtn = document.getElementById('tf-new');
  const revealBtn = document.getElementById('tf-reveal');
  const svg = document.getElementById('tf-svg');
  const numberEl = document.getElementById('tf-number');

  const NS = 'http://www.w3.org/2000/svg';
  const DOT_COLOR = '#ffcc33';
  const FRAME_COLOR = '#4fd1c5';

  let currentNumber = 0;
  let labelVisible = true;

  function rect(x, y, w, h, opts) {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y);
    r.setAttribute('width', w);
    r.setAttribute('height', h);
    Object.entries(opts || {}).forEach(([k, v]) => r.setAttribute(k, v));
    return r;
  }

  function circle(cx, cy, r, fill) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r', r);
    c.setAttribute('fill', fill);
    return c;
  }

  function render(n) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const frames = n > 10 ? 2 : 1;
    const cols = 5, rows = 2;
    // Two frames must fit the 620-wide viewBox, so shrink the cells for 11-20.
    const cell = frames === 2 ? 50 : 96, gap = frames === 2 ? 5 : 8;
    const frameW = cols * cell + (cols - 1) * gap;
    const frameH = rows * cell + (rows - 1) * gap;
    const frameGap = frames === 2 ? 20 : 30;
    const totalWidth = frames * frameW + (frames - 1) * frameGap;
    let startX = (620 - totalWidth) / 2;
    const startY = (260 - frameH) / 2;
    let remaining = n;

    for (let f = 0; f < frames; f++) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = startX + col * (cell + gap);
          const y = startY + row * (cell + gap);
          svg.appendChild(rect(x, y, cell, cell, { rx: 10, fill: 'none', stroke: FRAME_COLOR, 'stroke-width': 3 }));
          if (remaining > 0) {
            svg.appendChild(circle(x + cell / 2, y + cell / 2, cell * 0.32, DOT_COLOR));
            remaining--;
          }
        }
      }
      startX += frameW + frameGap;
    }
  }

  function updateLabel() {
    if (hideLabelCheckbox.checked && !labelVisible) {
      numberEl.textContent = '';
    } else {
      numberEl.textContent = currentNumber;
    }
  }

  function newNumber() {
    const max = parseInt(rangeSelect.value, 10);
    currentNumber = randInt(0, max);
    labelVisible = !hideLabelCheckbox.checked;
    render(currentNumber);
    updateLabel();
  }

  function toggleLabel() {
    labelVisible = !labelVisible;
    updateLabel();
  }

  newBtn.addEventListener('click', newNumber);
  revealBtn.addEventListener('click', toggleLabel);
  hideLabelCheckbox.addEventListener('change', () => {
    labelVisible = !hideLabelCheckbox.checked;
    updateLabel();
  });
  rangeSelect.addEventListener('change', newNumber);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') { e.preventDefault(); newNumber(); }
    if (e.key === 'r' || e.key === 'R') toggleLabel();
  });

  newNumber();
})();
