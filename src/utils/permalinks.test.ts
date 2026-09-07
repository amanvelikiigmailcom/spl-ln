import { describe, it, expect, vi } from 'vitest';
import { applyGetPermalinks } from './permalinks';

vi.mock('astrowind:config', () => ({
  SITE: {
    site: 'https://example.com',
    base: '/',
    trailingSlash: false,
  },
  APP_BLOG: {
    list: { pathname: 'blog' },
    category: { pathname: 'category' },
    tag: { pathname: 'tag' },
    post: { permalink: 'blog/%slug%' },
  },
  I18N: {
    language: 'en',
    textDirection: 'ltr',
  }
}));

describe('applyGetPermalinks', () => {
  it('should return primitive values as is', () => {
    expect(applyGetPermalinks(null)).toBe(null);
    expect(applyGetPermalinks(undefined)).toEqual({}); // Due to default parameter (menu: unknown = {})
    expect(applyGetPermalinks('string')).toBe('string');
    expect(applyGetPermalinks(42)).toBe(42);
    expect(applyGetPermalinks(true)).toBe(true);
  });

  it('should process arrays recursively', () => {
    const input = ['string', { href: 'test' }, [{ href: { type: 'home' } }]];
    const expected = ['string', { href: '/test' }, [{ href: '/' }]];
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve string href to permalink', () => {
    const input = { href: 'about-us' };
    const expected = { href: '/about-us' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve object href with type home', () => {
    const input = { href: { type: 'home' } };
    const expected = { href: '/' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve object href with type blog', () => {
    const input = { href: { type: 'blog' } };
    const expected = { href: '/blog' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve object href with type asset', () => {
    const input = { href: { type: 'asset', url: 'images/logo.png' } };
    const expected = { href: '/images/logo.png' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve object href with type asset and fallback url', () => {
    const input = { href: { type: 'asset' } };
    const expected = { href: '/' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should resolve object href with generic url and type', () => {
    const input = { href: { url: 'my-category', type: 'category' } };
    const expected = { href: '/category/my-category' };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });

  it('should process nested object structures recursively', () => {
    const input = {
      title: 'Menu',
      links: [
        { name: 'Home', href: { type: 'home' } },
        { name: 'Blog', href: { type: 'blog' } },
        { name: 'About', href: 'about' }
      ],
      metadata: {
        authorUrl: { href: 'author-page' }
      }
    };
    const expected = {
      title: 'Menu',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' }
      ],
      metadata: {
        authorUrl: { href: '/author-page' }
      }
    };
    expect(applyGetPermalinks(input)).toEqual(expected);
  });
});
