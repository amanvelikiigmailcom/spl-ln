const AUTH_START_URL = 'https://siplinx-ai.vercel.app/web/start';

function getPosthogDistinctId(): string | null {
  const ph = (window as unknown as Record<string, unknown>).posthog as
    | { get_distinct_id?: () => string }
    | undefined;
  try {
    return ph?.get_distinct_id?.() || null;
  } catch {
    return null;
  }
}

/**
 * Builds the /web/start URL that carries the current PostHog distinct_id
 * through to the download URL, so the app-side signup can be stitched
 * back to the same visitor in PostHog.
 */
export function buildAuthRedirectUrl(downloadUrl: string): string {
  const url = new URL(downloadUrl);
  const distinctId = getPosthogDistinctId();
  if (distinctId) url.searchParams.set('ph_did', distinctId);

  const redirect = encodeURIComponent(url.toString());
  return `${AUTH_START_URL}?redirect=${redirect}`;
}

/**
 * The Google auth flow always lands back on the English /welcome page,
 * regardless of which site language the visitor started from. Remember
 * their starting language here so /welcome can bounce Russian visitors
 * to /ru/welcome instead of guessing from navigator.language.
 */
export function rememberLangPreference(lang: 'en' | 'ru'): void {
  try {
    localStorage.setItem('siplinx_lang', lang);
  } catch {
    // localStorage unavailable (e.g. private mode) - /welcome falls back to navigator.language
  }
}
