(function () {
  const countSelect = document.getElementById('dice-count');
  const sidesSelect = document.getElementById('dice-sides');
  const rollBtn = document.getElementById('dice-roll');
  const row = document.getElementById('dice-row');
  const totalEl = document.getElementById('dice-total');

  const PIP_LAYOUTS = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 18], [25, 50], [25, 82], [75, 18], [75, 50], [75, 82]],
  };

  let rolling = false;

  function buildDice(n) {
    row.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const die = document.createElement('div');
      die.className = 'die';
      row.appendChild(die);
    }
  }

  function setFace(die, sides, value) {
    die.innerHTML = '';
    if (sides === 6) {
      const pipsWrap = document.createElement('div');
      pipsWrap.className = 'die-pips';
      PIP_LAYOUTS[value].forEach(([x, y]) => {
        const pip = document.createElement('div');
        pip.className = 'pip';
        pip.style.left = `calc(${x}% - 8px)`;
        pip.style.top = `calc(${y}% - 8px)`;
        pipsWrap.appendChild(pip);
      });
      die.appendChild(pipsWrap);
    } else {
      const num = document.createElement('div');
      num.className = 'die-number';
      num.textContent = value;
      die.appendChild(num);
    }
  }

  function roll() {
    if (rolling) return;
    rolling = true;
    const count = parseInt(countSelect.value, 10);
    const sides = parseInt(sidesSelect.value, 10);
    buildDice(count);
    const dice = Array.from(row.children);
    dice.forEach(d => d.classList.add('rolling'));
    totalEl.textContent = '';

    let ticks = 0;
    const maxTicks = 8;
    const interval = setInterval(() => {
      dice.forEach(d => setFace(d, sides, randInt(1, sides)));
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        let total = 0;
        dice.forEach(d => {
          const value = randInt(1, sides);
          total += value;
          setFace(d, sides, value);
          d.classList.remove('rolling');
        });
        totalEl.textContent = count > 1 ? `Total: ${total}` : '';
        rolling = false;
      }
    }, 80);
  }

  rollBtn.addEventListener('click', roll);
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); roll(); }
  });

  buildDice(parseInt(countSelect.value, 10));
  Array.from(row.children).forEach(d => setFace(d, parseInt(sidesSelect.value, 10), 1));
})();
