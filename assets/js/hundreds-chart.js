(function () {
  const rangeSelect = document.getElementById('hc-range');
  const hideCheckbox = document.getElementById('hc-hide-numbers');
  const clearBtn = document.getElementById('hc-clear');
  const skipButtonsEl = document.getElementById('hc-skip-buttons');
  const grid = document.getElementById('hc-grid');
  const stage = document.getElementById('hc-stage');

  function sizeGrid() {
    // Measure everything EXCEPT the stage, since the stage's own height
    // depends on the grid size we're about to set — using stage.clientHeight
    // here would be circular (it grows to fit whatever we just set).
    const mainEl = document.querySelector('.activity-main');
    const mainStyles = getComputedStyle(mainEl);
    const paddingV = parseFloat(mainStyles.paddingTop) + parseFloat(mainStyles.paddingBottom);
    const gap = parseFloat(mainStyles.rowGap) || 0;
    const siblingsHeight = Array.from(mainEl.children)
      .filter(c => c !== stage)
      .reduce((sum, c) => sum + c.getBoundingClientRect().height, 0);
    const gapsTotal = gap * (mainEl.children.length - 1);
    const topBar = document.querySelector('.top-bar');
    const badge = document.querySelector('.curriculum-badge');
    const fixedHeight = (topBar ? topBar.getBoundingClientRect().height : 0) +
      (badge ? badge.getBoundingClientRect().height : 0) +
      paddingV + siblingsHeight + gapsTotal;

    const stageStyles = getComputedStyle(stage);
    const stagePaddingV = parseFloat(stageStyles.paddingTop) + parseFloat(stageStyles.paddingBottom);
    const stagePaddingH = parseFloat(stageStyles.paddingLeft) + parseFloat(stageStyles.paddingRight);
    const stageBorderV = parseFloat(stageStyles.borderTopWidth) + parseFloat(stageStyles.borderBottomWidth);

    const remainingForStage = window.innerHeight - fixedHeight;
    const availableHeight = remainingForStage - stagePaddingV - stageBorderV - 24;
    const availableWidth = stage.clientWidth - stagePaddingH;
    const size = Math.max(240, Math.min(availableWidth, availableHeight));
    grid.style.width = `${size}px`;
  }

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

  window.addEventListener('resize', sizeGrid);
  if (window.ResizeObserver) {
    new ResizeObserver(sizeGrid).observe(stage);
  }
  document.addEventListener('fullscreenchange', () => setTimeout(sizeGrid, 50));

  buildSkipButtons();
  buildGrid();
  sizeGrid();
})();
