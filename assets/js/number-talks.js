(function () {
  const STRINGS = [
    { category: 'addition', level: 'early', title: 'Making Ten', problems: [
      { text: '8 + 2', answer: '10' }, { text: '8 + 3', answer: '11' },
      { text: '18 + 3', answer: '21' }, { text: '28 + 3', answer: '31' },
    ]},
    { category: 'addition', level: 'middle', title: 'Compensation', problems: [
      { text: '29 + 35', answer: '64' }, { text: '30 + 35', answer: '65' },
      { text: '30 + 34', answer: '64' },
    ]},
    { category: 'addition', level: 'upper', title: 'Compensation with Bigger Numbers', problems: [
      { text: '398 + 256', answer: '654' }, { text: '400 + 256', answer: '656' },
      { text: '400 + 254', answer: '654' },
    ]},
    { category: 'addition', level: 'early', title: 'Doubles Plus One', problems: [
      { text: '4 + 4', answer: '8' }, { text: '4 + 5', answer: '9' },
      { text: '14 + 5', answer: '19' }, { text: '24 + 5', answer: '29' },
    ]},
    { category: 'addition', level: 'middle', title: 'Friendly Numbers', problems: [
      { text: '47 + 25', answer: '72' }, { text: '50 + 25', answer: '75' }, { text: '50 + 22', answer: '72' },
    ]},
    { category: 'addition', level: 'upper', title: 'Adding Decimals', problems: [
      { text: '4.8 + 3.6', answer: '8.4' }, { text: '5 + 3.6', answer: '8.6' }, { text: '5 + 3.4', answer: '8.4' },
    ]},

    { category: 'subtraction', level: 'early', title: 'Counting Back', problems: [
      { text: '12 − 1', answer: '11' }, { text: '12 − 2', answer: '10' }, { text: '12 − 3', answer: '9' },
    ]},
    { category: 'subtraction', level: 'middle', title: 'Compensation', problems: [
      { text: '52 − 19', answer: '33' }, { text: '52 − 20', answer: '32' }, { text: '52 − 18', answer: '34' },
    ]},
    { category: 'subtraction', level: 'upper', title: 'Rounding to Subtract', problems: [
      { text: '1000 − 437', answer: '563' }, { text: '1000 − 440', answer: '560' }, { text: '997 − 437', answer: '560' },
    ]},
    { category: 'subtraction', level: 'early', title: 'Take Away From Ten', problems: [
      { text: '10 − 4', answer: '6' }, { text: '10 − 7', answer: '3' }, { text: '20 − 7', answer: '13' },
    ]},
    { category: 'subtraction', level: 'middle', title: 'Constant Difference', problems: [
      { text: '63 − 28', answer: '35' }, { text: '65 − 30', answer: '35' }, { text: '62 − 27', answer: '35' },
    ]},
    { category: 'subtraction', level: 'upper', title: 'Subtracting Decimals', problems: [
      { text: '5.2 − 1.9', answer: '3.3' }, { text: '5.2 − 2', answer: '3.2' }, { text: '5.3 − 2', answer: '3.3' },
    ]},

    { category: 'multiplication', level: 'early', title: 'Skip Counting', problems: [
      { text: '3 × 2', answer: '6' }, { text: '3 × 4', answer: '12' }, { text: '3 × 8', answer: '24' },
    ]},
    { category: 'multiplication', level: 'middle', title: 'Using Known Facts', problems: [
      { text: '6 × 4', answer: '24' }, { text: '6 × 8', answer: '48' }, { text: '12 × 4', answer: '48' },
    ]},
    { category: 'multiplication', level: 'upper', title: 'Halving Strategy', problems: [
      { text: '25 × 16', answer: '400' }, { text: '25 × 8', answer: '200' }, { text: '25 × 4', answer: '100' },
    ]},
    { category: 'multiplication', level: 'early', title: 'Doubling', problems: [
      { text: '4 × 2', answer: '8' }, { text: '4 × 4', answer: '16' }, { text: '4 × 8', answer: '32' },
    ]},
    { category: 'multiplication', level: 'middle', title: 'Doubling and Halving', problems: [
      { text: '8 × 5', answer: '40' }, { text: '4 × 10', answer: '40' }, { text: '2 × 20', answer: '40' },
    ]},
    { category: 'multiplication', level: 'upper', title: 'Halving and Doubling', problems: [
      { text: '6 × 50', answer: '300' }, { text: '12 × 25', answer: '300' }, { text: '3 × 100', answer: '300' },
    ]},

    { category: 'division', level: 'early', title: 'Sharing Equally', problems: [
      { text: '12 ÷ 2', answer: '6' }, { text: '12 ÷ 4', answer: '3' }, { text: '24 ÷ 4', answer: '6' },
    ]},
    { category: 'division', level: 'middle', title: 'Halving to Divide', problems: [
      { text: '84 ÷ 4', answer: '21' }, { text: '84 ÷ 2', answer: '42' }, { text: '42 ÷ 2', answer: '21' },
    ]},
    { category: 'division', level: 'upper', title: 'Factor Relationships', problems: [
      { text: '144 ÷ 12', answer: '12' }, { text: '144 ÷ 6', answer: '24' }, { text: '72 ÷ 6', answer: '12' },
    ]},
    { category: 'division', level: 'early', title: 'Related Facts', problems: [
      { text: '8 ÷ 2', answer: '4' }, { text: '16 ÷ 2', answer: '8' }, { text: '16 ÷ 4', answer: '4' },
    ]},
    { category: 'division', level: 'middle', title: 'Using Multiplication Facts', problems: [
      { text: '63 ÷ 7', answer: '9' }, { text: '63 ÷ 9', answer: '7' }, { text: '72 ÷ 8', answer: '9' },
    ]},
    { category: 'division', level: 'upper', title: 'Dividing Decimals', problems: [
      { text: '4.8 ÷ 4', answer: '1.2' }, { text: '4.8 ÷ 8', answer: '0.6' }, { text: '9.6 ÷ 8', answer: '1.2' },
    ]},

    { category: 'doubling', level: 'early', title: 'Doubles', problems: [
      { text: '2 + 2', answer: '4' }, { text: '4 + 4', answer: '8' }, { text: '3 + 3', answer: '6' },
    ]},
    { category: 'doubling', level: 'middle', title: 'Doubling Factors', problems: [
      { text: '15 × 2', answer: '30' }, { text: '15 × 4', answer: '60' }, { text: '30 × 2', answer: '60' },
    ]},
    { category: 'doubling', level: 'upper', title: 'Doubling with Decimals', problems: [
      { text: '1.5 × 2', answer: '3' }, { text: '1.5 × 4', answer: '6' }, { text: '3 × 4', answer: '12' },
    ]},
    { category: 'doubling', level: 'early', title: 'Doubles to 20', problems: [
      { text: '5 + 5', answer: '10' }, { text: '6 + 6', answer: '12' }, { text: '7 + 7', answer: '14' },
    ]},
    { category: 'doubling', level: 'middle', title: 'Doubling Chains', problems: [
      { text: '5 × 2', answer: '10' }, { text: '10 × 2', answer: '20' }, { text: '20 × 2', answer: '40' },
    ]},
    { category: 'doubling', level: 'upper', title: 'Doubling Fractions', problems: [
      { text: '1/4 × 2', answer: '1/2' }, { text: '1/2 × 2', answer: '1' }, { text: '1 × 2', answer: '2' },
    ]},

    { category: 'place-value', level: 'early', title: 'Bridging Tens', problems: [
      { text: '9 + 1', answer: '10' }, { text: '19 + 1', answer: '20' }, { text: '29 + 1', answer: '30' },
    ]},
    { category: 'place-value', level: 'middle', title: 'Bridging Hundreds', problems: [
      { text: '47 + 3', answer: '50' }, { text: '147 + 3', answer: '150' }, { text: '247 + 3', answer: '250' },
    ]},
    { category: 'place-value', level: 'upper', title: 'Bridging with Decimals', problems: [
      { text: '0.7 + 0.3', answer: '1' }, { text: '1.7 + 0.3', answer: '2' }, { text: '2.7 + 0.3', answer: '3' },
    ]},
    { category: 'place-value', level: 'early', title: 'Counting by Tens', problems: [
      { text: '10 + 10', answer: '20' }, { text: '20 + 10', answer: '30' }, { text: '30 + 10', answer: '40' },
    ]},
    { category: 'place-value', level: 'middle', title: 'Adding Multiples of Ten', problems: [
      { text: '240 + 30', answer: '270' }, { text: '340 + 30', answer: '370' }, { text: '440 + 30', answer: '470' },
    ]},
    { category: 'place-value', level: 'upper', title: 'Multiplying by Powers of Ten', problems: [
      { text: '4.5 × 10', answer: '45' }, { text: '4.5 × 100', answer: '450' }, { text: '4.5 × 1000', answer: '4500' },
    ]},
  ];

  const categorySelect = document.getElementById('nt-category');
  const levelSelect = document.getElementById('nt-level');
  const newBtn = document.getElementById('nt-new');
  const nextBtn = document.getElementById('nt-next');
  const revealBtn = document.getElementById('nt-reveal');
  const badge = document.getElementById('nt-badge');
  const problemEl = document.getElementById('nt-problem');
  const answerEl = document.getElementById('nt-answer');
  const progressEl = document.getElementById('nt-progress');

  let current = null;
  let index = 0;

  function labelFor(value, select) {
    const opt = Array.from(select.options).find(o => o.value === value);
    return opt ? opt.textContent : value;
  }

  function renderProgress() {
    progressEl.innerHTML = '';
    current.problems.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === index) dot.classList.add('active');
      progressEl.appendChild(dot);
    });
  }

  function renderProblem() {
    const p = current.problems[index];
    problemEl.textContent = p.text;
    answerEl.textContent = '';
    renderProgress();
  }

  function pickString() {
    const category = categorySelect.value;
    const level = levelSelect.value;
    let pool = STRINGS.filter(s => s.category === category && s.level === level);
    if (pool.length === 0) pool = STRINGS.filter(s => s.category === category);
    current = randChoice(pool);
    index = 0;
    badge.textContent = `${labelFor(current.category, categorySelect)} · ${labelFor(current.level, levelSelect)} · ${current.title}`;
    renderProblem();
  }

  function nextProblem() {
    if (!current) { pickString(); return; }
    if (index < current.problems.length - 1) {
      index++;
      renderProblem();
    } else {
      pickString();
    }
  }

  function revealAnswer() {
    if (!current) return;
    answerEl.textContent = `= ${current.problems[index].answer}`;
  }

  newBtn.addEventListener('click', pickString);
  nextBtn.addEventListener('click', nextProblem);
  revealBtn.addEventListener('click', revealAnswer);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); nextProblem(); }
    if (e.key === 'a' || e.key === 'A') revealAnswer();
    if (e.key === 'n' || e.key === 'N') pickString();
  });

  pickString();
})();
