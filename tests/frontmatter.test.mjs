import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { CONTENT_DIR, parseFrontmatter } from './helpers.mjs';

const blogDir = path.join(CONTENT_DIR, 'blog');
const posts = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') && f !== '_index.md');

describe('Blog post frontmatter', () => {
  for (const file of posts) {
    describe(file, () => {
      const fm = parseFrontmatter(path.join(blogDir, file));

      it('has title', () => {
        assert.ok(fm.title, 'should have title');
      });

      it('has valid date', () => {
        assert.ok(fm.date, 'should have date');
        assert.ok(!isNaN(new Date(fm.date).getTime()), 'date should be valid');
      });

      it('has description', () => {
        assert.ok(fm.description, 'should have description');
      });

      it('has image', () => {
        assert.ok(fm.image, 'should have image');
      });

      it('has non-empty tags array', () => {
        assert.ok(Array.isArray(fm.tags), 'tags should be an array');
        assert.ok(fm.tags.length > 0, 'tags should be non-empty');
      });
    });
  }
});
