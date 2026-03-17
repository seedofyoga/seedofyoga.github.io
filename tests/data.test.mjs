import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadYaml } from './helpers.mjs';

describe('schedule.yaml', () => {
  const data = loadYaml('schedule.yaml');

  it('has 7 days', () => {
    assert.equal(data.days.length, 7);
  });

  it('each day has classes with name, time, and valid level', () => {
    const validLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
    for (const day of data.days) {
      assert.ok(day.name, 'day should have a name');
      assert.ok(Array.isArray(day.classes), `${day.name} should have classes array`);
      for (const cls of day.classes) {
        assert.ok(cls.name, 'class should have name');
        assert.ok(cls.time, 'class should have time');
        assert.ok(validLevels.includes(cls.level), `level "${cls.level}" should be valid`);
      }
    }
  });
});

describe('pricing.yaml', () => {
  const data = loadYaml('pricing.yaml');

  it('has plans array with required fields', () => {
    assert.ok(Array.isArray(data.plans));
    for (const plan of data.plans) {
      assert.ok(plan.name, 'plan should have name');
      assert.ok(plan.price != null, 'plan should have price');
      assert.ok(plan.period, 'plan should have period');
      assert.ok(Array.isArray(plan.features), 'plan should have features array');
      assert.ok(typeof plan.highlighted === 'boolean', 'highlighted should be boolean');
      assert.ok(plan.cta, 'plan should have cta');
    }
  });

  it('has exactly 1 highlighted plan', () => {
    const highlighted = data.plans.filter((p) => p.highlighted);
    assert.equal(highlighted.length, 1);
  });
});

describe('about.yaml', () => {
  const data = loadYaml('about.yaml');

  it('has required non-empty fields', () => {
    assert.ok(data.name, 'should have name');
    assert.ok(data.title, 'should have title');
    assert.ok(data.photo, 'should have photo');
    assert.ok(data.bio, 'should have bio');
  });

  it('has certifications array', () => {
    assert.ok(Array.isArray(data.certifications));
    assert.ok(data.certifications.length > 0);
  });
});

describe('contact.yaml', () => {
  const data = loadYaml('contact.yaml');

  it('has required non-empty fields', () => {
    assert.ok(data.phone, 'should have phone');
    assert.ok(data.email, 'should have email');
    assert.ok(data.address, 'should have address');
  });

  it('email contains @', () => {
    assert.ok(data.email.includes('@'));
  });

  it('social URLs start with https://', () => {
    assert.ok(data.social.instagram.startsWith('https://'));
    assert.ok(data.social.facebook.startsWith('https://'));
  });
});
