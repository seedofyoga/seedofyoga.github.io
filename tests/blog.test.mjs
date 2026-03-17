import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadHtml } from './helpers.mjs';

describe('Blog list page', () => {
  const $ = loadHtml('blog/index.html');

  it('renders all 3 blog posts', () => {
    const articles = $('article');
    assert.equal(articles.length, 3);
  });

  for (const title of ['Finding Stillness in a Busy World', 'Spring Renewal', 'Yoga for Desk Workers']) {
    it(`shows post "${title}"`, () => {
      assert.ok($.html().includes(title));
    });
  }
});

describe('Blog single post', () => {
  const $ = loadHtml('blog/finding-stillness-in-a-busy-world/index.html');

  it('has title in h1', () => {
    const h1 = $('h1');
    assert.ok(h1.text().includes('Finding Stillness'));
  });

  it('renders tags', () => {
    const html = $.html().toLowerCase();
    assert.ok(html.includes('mindfulness'));
    assert.ok(html.includes('breathing'));
  });

  it('has "Back to Blog" link', () => {
    const link = $('a').filter((_, el) => $(el).text().includes('Back'));
    assert.ok(link.length > 0);
  });

  it('has post body content', () => {
    const body = $('article, .prose, main');
    assert.ok(body.text().length > 100, 'post body should have substantial content');
  });
});
