import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadHtml } from './helpers.mjs';

describe('Blog list page', () => {
  const $ = loadHtml('blog/index.html');

  it('renders at least one blog post', () => {
    const articles = $('article');
    assert.ok(articles.length > 0, 'blog list should have at least one article');
  });

  it('shows post "The Many Faces of Yoga: A Guide to the Main Styles"', () => {
    assert.ok($.html().includes('The Many Faces of Yoga: A Guide to the Main Styles'));
  });
});

describe('Blog single post', () => {
  const $ = loadHtml('blog/yoga-styles/index.html');

  it('has title in h1', () => {
    const h1 = $('h1');
    assert.ok(h1.text().includes('Many Faces of Yoga'));
  });

  it('renders tags', () => {
    const html = $.html().toLowerCase();
    assert.ok(html.includes('yoga styles'));
    assert.ok(html.includes('hatha'));
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
