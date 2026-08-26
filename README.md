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

Every activity page has a fullscreen button and keyboard shortcuts (shown at
the bottom of each page) so it's easy to drive from the front of the room.

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
(`title`, `emoji`, `script`), a matching `assets/js/<name>.js` file, and a
card on `index.html`.
