(function () {
  const rangeSelect = document.getElementById('hc-range');
  const hideCheckbox = document.getElementById('hc-hide-numbers');
  const clearBtn = document.getElementById('hc-clear');
  const skipButtonsEl = document.getElementById('hc-skip-buttons');
  const grid = document.getElementById('hc-grid');

  function buildGrid() {
    const start = parseInt(rangeSelect.value, 10);
    grid.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const n = start + i;
      const cell = document.createElement('div');
      cell.className = 'hundred-cell';
      cell.textContent = n;
      cell.dataset.number = n;
      if (hideCheckbox.checked) cell.classList.add('hidden-number');
      cell.addEventListener('click', () => cell.classList.toggle('highlight'));
      grid.appendChild(cell);
    }
  }

  function clearHighlights() {
    grid.querySelectorAll('.hundred-cell').forEach(cell => cell.classList.remove('highlight'));
  }

  function highlightMultiples(factor) {
    clearHighlights();
    grid.querySelectorAll('.hundred-cell').forEach(cell => {
      const n = parseInt(cell.dataset.number, 10);
      if (n % factor === 0) cell.classList.add('highlight');
    });
  }

  function buildSkipButtons() {
    skipButtonsEl.innerHTML = '';
    for (let n = 2; n <= 10; n++) {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.type = 'button';
      btn.textContent = n;
      btn.addEventListener('click', () => highlightMultiples(n));
      skipButtonsEl.appendChild(btn);
    }
  }

  rangeSelect.addEventListener('change', buildGrid);
  clearBtn.addEventListener('click', clearHighlights);
  hideCheckbox.addEventListener('change', () => {
    grid.querySelectorAll('.hundred-cell').forEach(cell => {
      cell.classList.toggle('hidden-number', hideCheckbox.checked);
    });
  });

  buildSkipButtons();
  buildGrid();
})();
