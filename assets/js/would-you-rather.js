(function () {
  const SCENARIOS = [
    // Value for money
    { category: 'value', level: 'early', a: '5 lollies for $2', b: '8 lollies for $3' },
    { category: 'value', level: 'early', a: '4 stickers for $1', b: '10 stickers for $2' },
    { category: 'value', level: 'early', a: 'A $5 toy', b: '3 toys for $12' },
    { category: 'value', level: 'early', a: '6 apples for $3', b: '10 apples for $4' },

    { category: 'value', level: 'middle', a: '3 movie tickets for $36', b: '5 movie tickets for $55' },
    { category: 'value', level: 'middle', a: '2kg of grapes for $8', b: '3kg of grapes for $10.50' },
    { category: 'value', level: 'middle', a: 'A $15 book', b: '2 books for $26' },
    { category: 'value', level: 'middle', a: '4 pizzas for $32', b: '6 pizzas for $42' },

    { category: 'value', level: 'upper', a: '250g of chips for $4.50', b: '400g of chips for $7.00' },
    { category: 'value', level: 'upper', a: '1.5L of juice for $3.60', b: '2L of juice for $4.60' },
    { category: 'value', level: 'upper', a: 'A $120 jacket at 25% off', b: 'A $150 jacket at 40% off' },
    { category: 'value', level: 'upper', a: '12 eggs for $6.60', b: '18 eggs for $9.90' },

    // Number size
    { category: 'number', level: 'early', a: 'Have 45 marbles', b: 'Have 54 marbles' },
    { category: 'number', level: 'early', a: 'Count to 100 by 1s', b: 'Count to 100 by 10s' },
    { category: 'number', level: 'early', a: 'Have 3 tens and 4 ones', b: 'Have 2 tens and 15 ones' },
    { category: 'number', level: 'early', a: 'Write the biggest 2-digit number', b: 'Write the smallest 3-digit number' },

    { category: 'number', level: 'middle', a: 'Multiply your age by 100', b: 'Add three zeros to your age' },
    { category: 'number', level: 'middle', a: 'Have 3/4 of a chocolate bar', b: 'Have 6/8 of a chocolate bar' },
    { category: 'number', level: 'middle', a: 'Round 748 to the nearest 10', b: 'Round 748 to the nearest 100' },
    { category: 'number', level: 'middle', a: 'Have 1000mL of lemonade', b: 'Have 1L of lemonade' },

    { category: 'number', level: 'upper', a: 'Have 3/4 of a pizza', b: 'Have 0.7 of a pizza' },
    { category: 'number', level: 'upper', a: 'Have a number that is 12 squared', b: 'Have a number that is 5 cubed' },
    { category: 'number', level: 'upper', a: 'Multiply a number by 1/2', b: 'Divide a number by 2' },
    { category: 'number', level: 'upper', a: 'Have 40% of 200', b: 'Have 1/4 of 320' },

    // Time & speed
    { category: 'time', level: 'early', a: 'Wait 3 minutes', b: 'Wait 200 seconds' },
    { category: 'time', level: 'early', a: 'Have recess for half an hour', b: 'Have recess for 25 minutes' },
    { category: 'time', level: 'early', a: 'Finish a race in 1 minute', b: 'Finish a race in 58 seconds' },
    { category: 'time', level: 'early', a: 'Watch a show for 2 hours', b: 'Watch a show for 90 minutes' },

    { category: 'time', level: 'middle', a: 'Run 1km in 6 minutes', b: 'Run 1500m in 8 minutes' },
    { category: 'time', level: 'middle', a: 'Wait 1.5 hours', b: 'Wait 85 minutes' },
    { category: 'time', level: 'middle', a: 'Finish homework in a quarter of an hour', b: 'Finish homework in 20 minutes' },
    { category: 'time', level: 'middle', a: 'Travel at 40km/h for 1 hour', b: 'Travel at 20km/h for 2 hours' },

    { category: 'time', level: 'upper', a: 'Travel 120km in 2 hours', b: 'Travel 150km in 3 hours' },
    { category: 'time', level: 'upper', a: 'Travel at 60km/h for 3 hours', b: 'Travel at 90km/h for 2 hours' },
    { category: 'time', level: 'upper', a: 'Finish a marathon in 3.5 hours', b: 'Finish a marathon in 210 minutes' },
    { category: 'time', level: 'upper', a: 'Save $15 a week for 8 weeks', b: 'Save $20 a week for 6 weeks' },

    // Chance
    { category: 'chance', level: 'early', a: 'Pick a red lolly from 3 red out of 5', b: 'Pick a red lolly from 2 red out of 4' },
    { category: 'chance', level: 'early', a: 'Roll an even number on a die', b: 'Roll an odd number on a die' },
    { category: 'chance', level: 'early', a: 'Pick blue from a bag with 4 blue, 1 red', b: 'Pick blue from a bag with 3 blue, 2 red' },
    { category: 'chance', level: 'early', a: 'Flip a coin and get heads', b: 'Spin a 2-colour spinner and land on blue' },

    { category: 'chance', level: 'middle', a: 'Roll a 6 on one die', b: 'Flip heads twice in a row' },
    { category: 'chance', level: 'middle', a: 'Win with 1 in 10 raffle tickets', b: 'Win with 2 in 25 raffle tickets' },
    { category: 'chance', level: 'middle', a: 'Draw an ace from a full deck', b: 'Roll a 1 on a 12-sided die' },
    { category: 'chance', level: 'middle', a: 'A 1 in 3 chance on a spinner', b: 'Pick 1 in 4 marbles' },

    { category: 'chance', level: 'upper', a: 'A 1 in 4 chance of winning', b: 'A 20% chance of winning' },
    { category: 'chance', level: 'upper', a: 'A 3 in 10 chance', b: 'A 1 in 3 chance' },
    { category: 'chance', level: 'upper', a: 'Roll doubles on two dice', b: 'Flip 3 heads in a row' },
    { category: 'chance', level: 'upper', a: 'A 0.4 probability of rain', b: 'A 2 in 5 chance of rain' },

    // Area & volume
    { category: 'measurement', level: 'early', a: 'A room 3m × 4m', b: 'A room 5m × 2m' },
    { category: 'measurement', level: 'early', a: 'A rectangle 4 units × 3 units', b: 'A square 4 units × 4 units' },
    { category: 'measurement', level: 'early', a: 'A sandpit 2m × 2m', b: 'A sandpit 1m × 5m' },
    { category: 'measurement', level: 'early', a: 'A garden 3m × 3m', b: 'A garden 2m × 5m' },

    { category: 'measurement', level: 'middle', a: 'A garden bed 2m × 6m', b: 'A garden bed 3m × 4m' },
    { category: 'measurement', level: 'middle', a: 'A pool 5m × 4m', b: 'A pool 4m × 6m' },
    { category: 'measurement', level: 'middle', a: 'A classroom 8m × 6m', b: 'A classroom 10m × 5m' },
    { category: 'measurement', level: 'middle', a: 'A 6m × 4m rectangle (perimeter 20m)', b: 'An 8m × 2m rectangle (perimeter 20m)' },

    { category: 'measurement', level: 'upper', a: 'A box 2m × 2m × 2m', b: 'A box 1m × 2m × 4m' },
    { category: 'measurement', level: 'upper', a: 'A box 3m × 3m × 3m', b: 'A box 2m × 3m × 5m' },
    { category: 'measurement', level: 'upper', a: 'A prism 4m × 5m × 6m', b: 'A cube 5m × 5m × 5m' },
    { category: 'measurement', level: 'upper', a: 'A room 5m × 4m × 3m', b: 'A room 6m × 5m × 2m' },
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
