# Maths Warm-Ups

A Jekyll site of TV-ready maths warm-up activities for the classroom, deployed
automatically to GitHub Pages via GitHub Actions.

**Live site:** https://andrew-snape.github.io/mathswarmups/

## Activities

- **Number Talks** — strings of related mental-maths problems (addition,
  subtraction, multiplication, division, doubling, place value) across three
  levels.
- **Subitising** — flashes a dot pattern (random, dice/domino, or ten-frame)
  for a configurable time, then hides it.
- **Which One Doesn't Belong?** — four numbers or shapes for open-ended
  reasoning discussions.
- **Virtual Dice** — roll 1–6 dice, d4 to d20, with an animated total.
- **Ten Frames** — shows a number on one or two ten-frames up to 20.
- **Number Generator** — random number picker with a custom range, including
  a "no repeats until the bag is empty" mode for fair student picks.
- **Hundreds Chart** — click to highlight patterns, reveal skip-counting
  multiples, or hide the numbers for before/after games, across 1–100 or
  101–200.
- **Would You Rather Maths** — two scenarios (value for money, time & speed,
  chance, area & volume), no single right answer, chosen and justified with
  maths.

Every activity page has a fullscreen button and keyboard shortcuts (shown at
the bottom of each page) so it's easy to drive from the front of the room.

## Australian Curriculum alignment

Each activity page shows a badge (e.g. "AC v9.0 · Number · Years 3–6") noting
its rough strand and year-band fit under the Australian Curriculum v9.0
Mathematics strands (Number, Algebra, Measurement, Space, Statistics,
Probability). This is an informal alignment guide for quick lesson planning,
**not** an official ACARA content-description mapping — always check the
actual content descriptions on [australiancurriculum.edu.au](https://www.australiancurriculum.edu.au/)
if you need one for programming/reporting.

| Activity | Strand(s) | Years |
|---|---|---|
| Number Talks | Number | 3–6 |
| Hundreds Chart | Number, Algebra (patterns) | F–6 |
| Would You Rather Maths | Number, Measurement, Probability (reasoning) | 3–6 |
| Subitising | Number | F–4 |
| Which One Doesn't Belong? | Number, Space (reasoning) | F–6 |
| Virtual Dice | Number, Probability | 1–6 |
| Ten Frames | Number | F–2 |
| Number Generator | Number | F–6 |

## Local development

Requires Ruby 3.1+ (Jekyll won't install on older Rubies, e.g. macOS's
system Ruby 2.6 — install a newer one via Homebrew or rbenv/rvm if needed).

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/mathswarmups/.

## Deployment

Pushing to `main` triggers `.github/workflows/jekyll.yml`, which builds the
Jekyll site and publishes it to GitHub Pages. Pages is already configured to
deploy from GitHub Actions (Settings → Pages → Source).

## Adding more activities

Add a new page under `activities/` with `layout: activity` front matter
(`title`, `emoji`, `script`, and optionally `strand`/`years` for the
curriculum badge), a matching `assets/js/<name>.js` file, and a card on
`index.html`.
