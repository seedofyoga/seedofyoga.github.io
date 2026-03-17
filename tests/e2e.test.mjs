import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import puppeteer from 'puppeteer';
import { createHandler } from '../lib/server-handler.mjs';
import { PUBLIC_DIR } from './helpers.mjs';

let server;
let browser;
let baseUrl;

before(async () => {
  server = http.createServer(createHandler(PUBLIC_DIR));
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${server.address().port}`;

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
});

after(async () => {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
});

function waitForAria(page, value) {
  return page.waitForFunction(
    (v) => document.getElementById('menu-toggle')?.getAttribute('aria-expanded') === v,
    { timeout: 6000 },
    value
  );
}

describe('E2E — Mobile menu', () => {
  it('toggles mobile menu on hamburger click', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });

    const button = await page.waitForSelector('#menu-toggle', {
      visible: true,
    });
    assert.ok(button, 'hamburger button should be visible');

    // Click to open
    await button.click();
    await waitForAria(page, 'true');
    const expandedAfterOpen = await page.$eval('#menu-toggle', (el) => el.getAttribute('aria-expanded'));
    assert.equal(expandedAfterOpen, 'true');

    // Click to close
    await button.click();
    await waitForAria(page, 'false');
    const expandedAfterClose = await page.$eval('#menu-toggle', (el) => el.getAttribute('aria-expanded'));
    assert.equal(expandedAfterClose, 'false');

    await page.close();
  });
});

describe('E2E — Page navigation', () => {
  it('navigates to blog list and back', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });

    // Click "View All Posts" link
    const viewAll = await page.evaluateHandle(() => {
      const links = [...document.querySelectorAll('a')];
      return links.find((a) => a.textContent.includes('View All Posts'));
    });

    if (viewAll) {
      await viewAll.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      assert.ok(page.url().includes('/blog'));

      // Click a post link
      const postLink = await page.$('article a');
      if (postLink) {
        await postLink.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        assert.ok(page.url().includes('/blog/'));

        // Click "Back to Blog"
        const backLink = await page.evaluateHandle(() => {
          const links = [...document.querySelectorAll('a')];
          return links.find((a) => a.textContent.includes('Back'));
        });
        if (backLink) {
          await backLink.click();
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
          assert.ok(page.url().includes('/blog'));
        }
      }
    }

    await page.close();
  });
});
