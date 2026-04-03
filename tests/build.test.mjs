import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { PUBLIC_DIR } from './helpers.mjs';

describe('Hugo build output', () => {
  it('produces public/index.html', () => {
    const stat = fs.statSync(path.join(PUBLIC_DIR, 'index.html'));
    assert.ok(stat.size > 0, 'index.html should be non-empty');
  });

  it('produces public/blog/index.html', () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'blog', 'index.html')));
  });

  for (const slug of ['yoga-styles']) {
    it(`produces blog post page: ${slug}`, () => {
      assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'blog', slug, 'index.html')));
    });
  }

  it('produces sitemap.xml', () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'sitemap.xml')));
  });

  it('contains no Hugo error markers', () => {
    const index = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');
    assert.ok(!index.includes('ZgotmplZ'), 'should not contain ZgotmplZ');
    assert.ok(!index.includes('HAHAHUGOSHORTCODE'), 'should not contain HAHAHUGOSHORTCODE');
  });
});
