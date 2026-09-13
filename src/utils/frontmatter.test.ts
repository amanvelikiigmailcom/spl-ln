import { describe, it, expect } from 'vitest';
import { jsonLdRemarkPlugin } from './frontmatter';
import type { Root } from 'mdast';

describe('jsonLdRemarkPlugin', () => {
  it('should transform a valid JSON-LD code block into an HTML script tag', () => {
    const plugin = jsonLdRemarkPlugin.call({});

    const transform = plugin;

    const parent: Root = {
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'json',
          value: '{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Test"\n}',
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(parent, {} as any, {} as any);

    expect(parent.children[0]).toEqual({
      type: 'html',
      value:
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Test"}</script>',
    });
  });

  it('should escape < in JSON-LD', () => {
    const plugin = jsonLdRemarkPlugin.call({});

    const transform = plugin;

    const parent: Root = {
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'json',
          value: '{\n  "@context": "https://schema.org",\n  "text": "<script>alert(1)</script>"\n}',
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(parent, {} as any, {} as any);

    expect(parent.children[0]).toEqual({
      type: 'html',
      value:
        '<script type="application/ld+json">{"@context":"https://schema.org","text":"\\u003cscript>alert(1)\\u003c/script>"}</script>',
    });
  });

  it('should ignore code blocks that are not JSON', () => {
    const plugin = jsonLdRemarkPlugin.call({});

    const transform = plugin;

    const parent: Root = {
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'js',
          value: 'const a = 1;',
        },
      ],
    };

    const expectedChildren = JSON.parse(JSON.stringify(parent.children));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(parent, {} as any, {} as any);

    expect(parent.children).toEqual(expectedChildren);
  });

  it('should ignore JSON code blocks without @context', () => {
    const plugin = jsonLdRemarkPlugin.call({});

    const transform = plugin;

    const parent: Root = {
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'json',
          value: '{"a": 1}',
        },
      ],
    };

    const expectedChildren = JSON.parse(JSON.stringify(parent.children));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(parent, {} as any, {} as any);

    expect(parent.children).toEqual(expectedChildren);
  });

  it('should handle invalid JSON syntax and return without modifying the tree', () => {
    const plugin = jsonLdRemarkPlugin.call({});

    const transform = plugin;

    const parent: Root = {
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'json',
          // Note the trailing comma which makes it invalid JSON
          value: '{\n  "@context": "https://schema.org",\n  "test": 1,\n}',
        },
      ],
    };

    const expectedChildren = JSON.parse(JSON.stringify(parent.children));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(parent, {} as any, {} as any);

    expect(parent.children).toEqual(expectedChildren);
  });
});
