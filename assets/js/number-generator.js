(function () {
  const minInput = document.getElementById('ng-min');
  const maxInput = document.getElementById('ng-max');
  const noRepeatCheckbox = document.getElementById('ng-no-repeat');
  const generateBtn = document.getElementById('ng-generate');
  const resetBtn = document.getElementById('ng-reset');
  const numberEl = document.getElementById('ng-number');
  const remainingEl = document.getElementById('ng-remaining');

  let bag = [];
  let rolling = false;

  function range() {
    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);
    if (isNaN(min)) min = 1;
    if (isNaN(max)) max = 20;
    if (max < min) [min, max] = [max, min];
    return { min, max };
  }

  function resetBag() {
    const { min, max } = range();
    bag = [];
    for (let i = min; i <= max; i++) bag.push(i);
    bag = shuffle(bag);
    updateRemaining();
  }

  function updateRemaining() {
    if (noRepeatCheckbox.checked) {
      remainingEl.textContent = `${bag.length} number${bag.length === 1 ? '' : 's'} left in the bag`;
    } else {
      remainingEl.textContent = '';
    }
  }

  function pickNumber() {
    const { min, max } = range();
    if (noRepeatCheckbox.checked) {
      if (bag.length === 0) resetBag();
      const value = bag.pop();
      updateRemaining();
      return value;
    }
    return randInt(min, max);
  }

  function generate() {
    if (rolling) return;
    rolling = true;
    const { min, max } = range();
    let ticks = 0;
    const maxTicks = 10;
    const interval = setInterval(() => {
      numberEl.textContent = randInt(min, max);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        numberEl.textContent = pickNumber();
        rolling = false;
      }
    }, 60);
  }

  generateBtn.addEventListener('click', generate);
  resetBtn.addEventListener('click', resetBag);
  noRepeatCheckbox.addEventListener('change', () => {
    if (noRepeatCheckbox.checked) resetBag();
    else updateRemaining();
  });
  [minInput, maxInput].forEach(el => el.addEventListener('change', resetBag));

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') { e.preventDefault(); generate(); }
  });

  resetBag();
})();
