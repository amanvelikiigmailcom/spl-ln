import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

// Matches a trailing `{#custom-id}` on a heading, e.g. "## Some heading {#some-id}".
// Anchor ids may be non-Latin (Cyrillic, etc.), so match any run of non-brace,
// non-whitespace characters rather than restricting to [a-z0-9-].
const HEADING_ID_PATTERN = /\s*\{#([^{}\s]+)\}\s*$/;

/**
 * Articles write headings as `## Heading text {#custom-id}` so the table of contents
 * can link to short, stable anchors. Astro's default markdown pipeline has no plugin
 * that understands that syntax, so without this it renders as literal visible text
 * and the heading gets no id (breaking every TOC link on every article).
 */
export const headingCustomIdRemarkPlugin: RemarkPlugin = () => {
  return function (tree) {
    visit(tree, 'heading', (node) => {
      const lastChild = node.children?.[node.children.length - 1];
      if (!lastChild || lastChild.type !== 'text') return;

      const match = lastChild.value.match(HEADING_ID_PATTERN);
      if (!match) return;

      lastChild.value = lastChild.value.slice(0, match.index).trimEnd();
      if (!lastChild.value) {
        node.children.pop();
      }

      node.data = {
        ...node.data,
        hProperties: {
          ...(node.data?.hProperties as Record<string, unknown> | undefined),
          id: match[1],
        },
      };
    });
  };
};

/**
 * Articles end with one or more ```json code fences containing schema.org JSON-LD
 * (Article, FAQPage, etc.) per the writer's own output spec. Left as plain fenced
 * code, that JSON-LD renders as a visible, syntax-highlighted wall of text at the
 * bottom of every article instead of being read by search engines - readers see raw
 * JSON, and Google never sees it as structured data at all. This converts any JSON
 * code block containing "@context" (i.e. actual schema.org markup, not an unrelated
 * JSON example) into a hidden `<script type="application/ld+json">` tag instead.
 */
export const jsonLdRemarkPlugin: RemarkPlugin = () => {
  return function (tree) {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'json' || typeof index !== 'number' || !parent) return;
      if (!node.value.includes('"@context"')) return;

      let parsed: unknown;
      try {
        parsed = JSON.parse(node.value);
      } catch {
        return;
      }

      const safeJson = JSON.stringify(parsed).replace(/</g, '\\u003c');
      parent.children[index] = {
        type: 'html',
        value: `<script type="application/ld+json">${safeJson}</script>`,
      };
    });
  };
};

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        i++;
      }
    }
  };
};
