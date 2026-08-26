(function () {
  const SCENARIOS = [
    'Lollies in the jar',
    'Steps from the classroom door to the office',
    'Pages in this week\'s reading book',
    'Seconds it takes to sing the chorus',
    'Marbles in the bag',
    'People who could fit in our classroom',
    'Jellybeans in the bowl',
    'Books on the classroom shelf',
    'Steps around the basketball court',
    'Squares on the school oval, side by side',
  ];

  const LEVELS = {
    early: { min: 1, max: 30, coarse: 5, fine: null },
    middle: { min: 1, max: 200, coarse: 20, fine: 5 },
    upper: { min: 1, max: 1000, coarse: 100, fine: 25 },
  };

  const levelSelect = document.getElementById('em-level');
  const newBtn = document.getElementById('em-new');
  const nextBtn = document.getElementById('em-next');
  const revealBtn = document.getElementById('em-reveal');
  const scenarioEl = document.getElementById('em-scenario');
  const cluesEl = document.getElementById('em-clues');
  const answerEl = document.getElementById('em-answer');

  let target = 0;
  let clues = [];
  let shownCount = 0;

  function digitSum(n) {
    return String(n).split('').reduce((sum, d) => sum + Number(d), 0);
  }

  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function findDivisorClue(n, candidates) {
    const divisor = candidates.find(d => d !== n && n % d === 0);
    if (divisor) return `It's a multiple of ${divisor}.`;
    return null;
  }

  function buildClues(n, level) {
    const cfg = LEVELS[level];
    const list = [];

    const lower = Math.floor(n / cfg.coarse) * cfg.coarse;
    list.push(`It's between ${lower} and ${lower + cfg.coarse}.`);

    list.push(n % 2 === 0 ? "It's an even number." : "It's an odd number.");

    if (level === 'early') {
      list.push(`The ones digit is ${n % 10}.`);
    } else if (level === 'middle') {
      list.push(findDivisorClue(n, [10, 5, 25, 20]) || `The digits add up to ${digitSum(n)}.`);
    } else {
      list.push(
        (isPrime(n) && n > 3 ? "It's a prime number." : null) ||
        findDivisorClue(n, [3, 4, 6, 7, 8, 9, 11, 12, 25, 50]) ||
        `The digits add up to ${digitSum(n)}.`
      );
    }

    if (cfg.fine) {
      const lower2 = Math.floor(n / cfg.fine) * cfg.fine;
      list.push(`Actually, it's between ${lower2} and ${lower2 + cfg.fine}.`);
    }

    return list;
  }

  function newMystery() {
    const level = levelSelect.value;
    const cfg = LEVELS[level];
    target = randInt(cfg.min, cfg.max);
    clues = buildClues(target, level);
    shownCount = 0;
    scenarioEl.textContent = `Mystery: ${randChoice(SCENARIOS)}`;
    cluesEl.innerHTML = '';
    answerEl.style.display = 'none';
  }

  function nextClue() {
    if (!clues.length) { newMystery(); return; }
    if (shownCount >= clues.length) return;
    const li = document.createElement('li');
    li.innerHTML = `<span class="clue-num">Clue ${shownCount + 1}:</span> ${clues[shownCount]}`;
    cluesEl.appendChild(li);
    shownCount++;
  }

  function revealAnswer() {
    if (!clues.length) return;
    answerEl.textContent = `It was ${target}!`;
    answerEl.style.display = '';
  }

  newBtn.addEventListener('click', newMystery);
  nextBtn.addEventListener('click', nextClue);
  revealBtn.addEventListener('click', revealAnswer);
  levelSelect.addEventListener('change', newMystery);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); nextClue(); }
    if (e.key === 'a' || e.key === 'A') revealAnswer();
    if (e.key === 'n' || e.key === 'N') newMystery();
  });

  newMystery();
})();
