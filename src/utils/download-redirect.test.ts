import { describe, it, expect, vi, afterEach } from 'vitest';
import { buildAuthRedirectUrl } from './download-redirect';

describe('buildAuthRedirectUrl', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should append ph_did when window.posthog is defined and returns distinctId', () => {
    const mockDistinctId = 'test-distinct-id-123';

    // Mock window.posthog
    vi.stubGlobal('window', {
      posthog: {
        get_distinct_id: () => mockDistinctId
      }
    });

    const downloadUrl = 'https://example.com/download';
    const result = buildAuthRedirectUrl(downloadUrl);

    // Expected redirect URL should have ph_did added to the downloadUrl
    const expectedDownloadUrl = new URL(downloadUrl);
    expectedDownloadUrl.searchParams.set('ph_did', mockDistinctId);
    const expectedRedirect = encodeURIComponent(expectedDownloadUrl.toString());
    const expectedFinalUrl = `https://siplinx-ai.vercel.app/web/start?redirect=${expectedRedirect}`;

    expect(result).toBe(expectedFinalUrl);
  });

  it('should not append ph_did when window.posthog is not defined', () => {
    // Ensure window is not defined with posthog
    vi.stubGlobal('window', {});

    const downloadUrl = 'https://example.com/download';
    const result = buildAuthRedirectUrl(downloadUrl);

    // Expected redirect URL should not have ph_did
    const expectedRedirect = encodeURIComponent(downloadUrl);
    const expectedFinalUrl = `https://siplinx-ai.vercel.app/web/start?redirect=${expectedRedirect}`;

    expect(result).toBe(expectedFinalUrl);
  });

  it('should not append ph_did when window.posthog.get_distinct_id throws an error', () => {
    // Mock window.posthog to throw an error
    vi.stubGlobal('window', {
      posthog: {
        get_distinct_id: () => {
          throw new Error('Some error');
        }
      }
    });

    const downloadUrl = 'https://example.com/download';
    const result = buildAuthRedirectUrl(downloadUrl);

    // Expected redirect URL should not have ph_did
    const expectedRedirect = encodeURIComponent(downloadUrl);
    const expectedFinalUrl = `https://siplinx-ai.vercel.app/web/start?redirect=${expectedRedirect}`;

    expect(result).toBe(expectedFinalUrl);
  });
});
