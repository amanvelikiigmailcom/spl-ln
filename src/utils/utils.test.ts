import { describe, it, expect, vi } from 'vitest';
import { getFormattedDate, trim, toUiAmount, formatter } from './utils';

// Mock the Astro config module
vi.mock('astrowind:config', () => ({
  I18N: { language: 'en' }
}));

describe('utils', () => {
  describe('formatter', () => {
    it('is an instance of Intl.DateTimeFormat', () => {
      expect(formatter).toBeInstanceOf(Intl.DateTimeFormat);
    });
  });

  describe('getFormattedDate', () => {
    it('formats a valid date correctly', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      expect(getFormattedDate(date)).toBe('Jan 1, 2023');
    });

    it('returns empty string if date is falsy', () => {
      // @ts-expect-error testing invalid input
      expect(getFormattedDate(null)).toBe('');
      // @ts-expect-error testing invalid input
      expect(getFormattedDate(undefined)).toBe('');
    });
  });

  describe('trim', () => {
    it('trims specified character from both ends', () => {
      expect(trim('/hello/', '/')).toBe('hello');
    });

    it('returns the same string if character is not at the ends', () => {
      expect(trim('hello', '/')).toBe('hello');
    });

    it('trims multiple instances of the character from both ends', () => {
      expect(trim('///hello///', '/')).toBe('hello');
    });

    it('handles string with character only at the start', () => {
      expect(trim('//hello', '/')).toBe('hello');
    });

    it('handles string with character only at the end', () => {
      expect(trim('hello//', '/')).toBe('hello');
    });

    it('handles string containing only the trim character', () => {
      expect(trim('/////', '/')).toBe('');
    });

    it('handles default parameters correctly', () => {
      expect(trim()).toBe('');
      expect(trim('hello')).toBe('hello');
    });
  });

  describe('toUiAmount', () => {
    it('formats billions', () => {
      expect(toUiAmount(1500000000)).toBe('1.5B');
      expect(toUiAmount(1000000000)).toBe('1B');
    });

    it('formats millions', () => {
      expect(toUiAmount(1500000)).toBe('1.5M');
      expect(toUiAmount(1000000)).toBe('1M');
    });

    it('formats thousands', () => {
      expect(toUiAmount(1500)).toBe('1.5K');
      expect(toUiAmount(1000)).toBe('1K');
    });

    it('formats small numbers', () => {
      expect(toUiAmount(500)).toBe('500');
      expect(toUiAmount(999)).toBe('999');
    });

    it('handles zero or undefined', () => {
      expect(toUiAmount(0)).toBe(0);
      // @ts-expect-error testing invalid input
      expect(toUiAmount(null)).toBe(0);
      // @ts-expect-error testing invalid input
      expect(toUiAmount(undefined)).toBe(0);
    });

    it('formats negative numbers without K/M/B logic', () => {
      expect(toUiAmount(-1500)).toBe('-1500');
    });
  });
});
