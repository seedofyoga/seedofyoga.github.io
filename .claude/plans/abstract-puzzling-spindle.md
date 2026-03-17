# Plan: Fix flaky E2E mobile menu test on CI

## Context

The "closes mobile menu when a nav link is clicked" E2E test passes locally but fails on CI with a 3s timeout on `waitForAria(page, 'false')`. The mobile menu uses a CSS `max-height` transition (`duration-500`, 500ms) with `overflow-hidden`. After `waitForAria(page, 'true')` confirms the toggle state, the CSS transition is still animating — on slower CI runners, clicking the link before it becomes visible means the click handler never fires.

## Fix

**File:** `tests/e2e.test.mjs`, line ~74

Replace:
```js
const link = await page.$('#mobile-menu a');
```

With:
```js
const link = await page.waitForSelector('#mobile-menu a', { visible: true });
```

`waitForSelector` with `visible: true` waits until the element has non-zero bounding box and is not hidden, ensuring the transition has completed enough for the link to be clickable.

## Verification

1. `npm test` — all tests pass locally
2. Push and confirm CI passes
