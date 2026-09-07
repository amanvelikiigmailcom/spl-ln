import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rememberLangPreference } from '../src/utils/download-redirect';

describe('rememberLangPreference', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should set lang in localStorage when available', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    rememberLangPreference('ru');

    expect(setItemSpy).toHaveBeenCalledWith('siplinx_lang', 'ru');
    expect(localStorage.getItem('siplinx_lang')).toBe('ru');
  });

  it('should not throw when localStorage is unavailable or throws', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    expect(() => rememberLangPreference('en')).not.toThrow();
    // happy-dom implements localStorage with its own Storage class.
    // If we mock window.localStorage itself, we can avoid the prototype spy issue.
    const originalLocalStorage = global.localStorage;
    const mockSetItem = vi.fn().mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    Object.defineProperty(global, 'localStorage', {
      value: { setItem: mockSetItem },
      writable: true,
    });

    expect(() => rememberLangPreference('en')).not.toThrow();
    expect(mockSetItem).toHaveBeenCalledWith('siplinx_lang', 'en');

    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });
});
