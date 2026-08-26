(function () {
  const NUMBER_PUZZLES = [
    ['12', '18', '25', '30'],
    ['1/2', '0.5', '50%', '5/10'],
    ['3', '9', '27', '81'],
    ['100', '64', '49', '36'],
    ['7', '14', '21', '35'],
    ['1000', '999', '1001', '998'],
    ['1/4', '0.25', '25%', '4'],
    ['-5', '5', '0', '10'],
    ['3.14', '22/7', 'π', '3'],
    ['144', '12', '6', '2'],
    ['0.1', '10%', '1/10', '0.01'],
    ['20', '15', '10', '5'],
  ];

  const SHAPE_PUZZLES = [
    ['🔴', '🔵', '🟡', '🟩'],
    ['🔺', '🔻', '⬛', '⬜'],
    ['⭐', '🔶', '🔷', '⬛'],
    ['🟢', '🟢', '🟢', '🔵'],
    ['🔺', '🔺', '🔻', '🔺'],
    ['🟥', '🟧', '🟨', '🟦'],
    ['◼️', '◻️', '🔲', '🔳'],
    ['🔵', '🟣', '🔺', '🔷'],
  ];

  const typeSelect = document.getElementById('wodb-type');
  const grid = document.getElementById('wodb-grid');
  const newBtn = document.getElementById('wodb-new');

  let lastPuzzle = null;

  function pool() {
    if (typeSelect.value === 'numbers') return NUMBER_PUZZLES;
    if (typeSelect.value === 'shapes') return SHAPE_PUZZLES;
    return NUMBER_PUZZLES.concat(SHAPE_PUZZLES);
  }

  function render() {
    let options = pool();
    let puzzle = randChoice(options);
    if (options.length > 1) {
      while (puzzle === lastPuzzle) puzzle = randChoice(options);
    }
    lastPuzzle = puzzle;

    grid.innerHTML = '';
    shuffle(puzzle).forEach((item) => {
      const cell = document.createElement('div');
      cell.className = 'wodb-cell';
      cell.textContent = item;
      grid.appendChild(cell);
    });
  }

  newBtn.addEventListener('click', render);
  typeSelect.addEventListener('change', render);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); render(); }
  });

  render();
})();
