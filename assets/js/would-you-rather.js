(function () {
  const SCENARIOS = [
    { category: 'value', level: 'early', a: '5 lollies for $2', b: '8 lollies for $3' },
    { category: 'value', level: 'middle', a: '3 movie tickets for $36', b: '5 movie tickets for $55' },
    { category: 'value', level: 'upper', a: '250g of chips for $4.50', b: '400g of chips for $7.00' },

    { category: 'number', level: 'early', a: 'Have 45 marbles', b: 'Have 54 marbles' },
    { category: 'number', level: 'middle', a: 'Multiply your age by 100', b: "Add three zeros to your age" },
    { category: 'number', level: 'upper', a: 'Have 3/4 of a pizza', b: 'Have 0.7 of a pizza' },

    { category: 'time', level: 'early', a: 'Wait 3 minutes', b: 'Wait 200 seconds' },
    { category: 'time', level: 'middle', a: 'Run 1km in 6 minutes', b: 'Run 1500m in 8 minutes' },
    { category: 'time', level: 'upper', a: 'Travel 120km in 2 hours', b: 'Travel 150km in 3 hours' },

    { category: 'chance', level: 'early', a: 'Pick a red lolly from 3 red out of 5', b: 'Pick a red lolly from 2 red out of 4' },
    { category: 'chance', level: 'middle', a: 'Roll a 6 on one die', b: 'Flip heads twice in a row' },
    { category: 'chance', level: 'upper', a: 'A 1 in 4 chance of winning', b: 'A 20% chance of winning' },

    { category: 'measurement', level: 'early', a: 'A room 3m × 4m', b: 'A room 5m × 2m' },
    { category: 'measurement', level: 'middle', a: 'A garden bed 2m × 6m', b: 'A garden bed 3m × 4m' },
    { category: 'measurement', level: 'upper', a: 'A box 2m × 2m × 2m', b: 'A box 1m × 2m × 4m' },
  ];

  const categorySelect = document.getElementById('wyr-category');
  const levelSelect = document.getElementById('wyr-level');
  const newBtn = document.getElementById('wyr-new');
  const aText = document.getElementById('wyr-a-text');
  const bText = document.getElementById('wyr-b-text');

  let lastScenario = null;

  function pool() {
    return SCENARIOS.filter(s => s.category === categorySelect.value && s.level === levelSelect.value);
  }

  function render() {
    let options = pool();
    if (options.length === 0) options = SCENARIOS.filter(s => s.category === categorySelect.value);
    let scenario = randChoice(options);
    if (options.length > 1) {
      while (scenario === lastScenario) scenario = randChoice(options);
    }
    lastScenario = scenario;

    const flipped = Math.random() < 0.5;
    aText.textContent = flipped ? scenario.b : scenario.a;
    bText.textContent = flipped ? scenario.a : scenario.b;
  }

  newBtn.addEventListener('click', render);
  categorySelect.addEventListener('change', render);
  levelSelect.addEventListener('change', render);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); render(); }
  });

  render();
})();
