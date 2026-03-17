import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadHtml, loadYaml } from './helpers.mjs';

const $ = loadHtml('index.html');

describe('Homepage — Navigation', () => {
  const navLinks = $('nav a');

  it('has 6 menu links per viewport (desktop + mobile)', () => {
    // Nav contains desktop links + duplicated mobile links
    assert.ok(navLinks.length >= 6, 'should have at least 6 nav links');
  });

  for (const [text, href] of [
    ['Schedule', '/#schedule'],
    ['Pricing', '/#pricing'],
    ['About', '/#about'],
    ['Location', '/#location'],
    ['Blog', '/blog/'],
    ['Contact', '/#contact'],
  ]) {
    it(`has "${text}" link pointing to ${href}`, () => {
      const link = navLinks.filter((_, el) => $(el).text().trim() === text);
      assert.ok(link.length > 0, `link "${text}" should exist`);
      assert.equal(link.attr('href'), href);
    });
  }

  it('has mobile menu button', () => {
    assert.ok($('button#menu-toggle').length > 0);
  });

  it('has mobile menu container', () => {
    assert.ok($('#mobile-menu').length > 0);
  });
});

describe('Homepage — Schedule', () => {
  const schedule = loadYaml('schedule.yaml');

  it('renders all 7 day names', () => {
    const html = $.html();
    for (const day of schedule.days) {
      assert.ok(html.includes(day.name), `should contain day "${day.name}"`);
    }
  });

  it('renders class names and times', () => {
    const html = $.html();
    for (const day of schedule.days) {
      for (const cls of day.classes) {
        // Hugo HTML-escapes & to &amp;
        const escapedName = cls.name.replace(/&/g, '&amp;');
        assert.ok(html.includes(escapedName), `should contain class "${cls.name}"`);
        assert.ok(html.includes(cls.time), `should contain time "${cls.time}"`);
      }
    }
  });
});

describe('Homepage — Pricing', () => {
  const pricing = loadYaml('pricing.yaml');

  it('renders all plan names and prices', () => {
    const html = $.html();
    for (const plan of pricing.plans) {
      assert.ok(html.includes(plan.name), `should contain plan "${plan.name}"`);
      assert.ok(html.includes(String(plan.price)), `should contain price "${plan.price}"`);
    }
  });

  it('has exactly one "Most Popular" badge', () => {
    const matches = $.html().match(/Most Popular/g);
    assert.equal(matches?.length, 1);
  });
});

describe('Homepage — About', () => {
  const about = loadYaml('about.yaml');

  it('renders instructor name and title', () => {
    const html = $.html();
    assert.ok(html.includes(about.name));
    // Hugo HTML-escapes & to &amp;
    const escapedTitle = about.title.replace(/&/g, '&amp;');
    assert.ok(html.includes(escapedTitle));
  });

  it('renders certifications', () => {
    const html = $.html();
    for (const cert of about.certifications) {
      assert.ok(html.includes(cert), `should contain certification "${cert}"`);
    }
  });
});

describe('Homepage — Blog Preview', () => {
  it('shows exactly 3 blog preview cards', () => {
    const section = $("#blog-preview, section:has(a[href='/blog/'])");
    const articles = section.find('article');
    assert.equal(articles.length, 3);
  });

  it('has "View All Posts" link', () => {
    const link = $('a').filter((_, el) => $(el).text().includes('View All Posts'));
    assert.ok(link.length > 0);
  });
});

describe('Homepage — Contact', () => {
  const contact = loadYaml('contact.yaml');

  it('renders phone and email', () => {
    const html = $.html();
    assert.ok(html.includes(contact.phone));
    assert.ok(html.includes(contact.email));
  });

  it('has maps embed iframe', () => {
    const iframe = $('iframe');
    assert.ok(iframe.length > 0, 'should have an iframe for maps');
  });
});

describe('Homepage — Footer', () => {
  const footer = $('footer');

  it('has footer element', () => {
    assert.ok(footer.length > 0);
  });

  it('contains copyright text', () => {
    assert.ok(footer.text().includes('Seed of Yoga'));
  });
});
