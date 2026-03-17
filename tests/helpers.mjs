import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import yaml from 'js-yaml';

const PROJECT_ROOT = path.resolve(import.meta.dirname, '..');

export const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
export const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'en');
export const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

export function loadHtml(relativePath) {
  const html = fs.readFileSync(path.join(PUBLIC_DIR, relativePath), 'utf-8');
  return load(html);
}

export function loadYaml(relativePath) {
  const raw = fs.readFileSync(path.join(DATA_DIR, relativePath), 'utf-8');
  return yaml.load(raw);
}

export function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`No frontmatter found in ${filePath}`);
  return yaml.load(match[1]);
}
