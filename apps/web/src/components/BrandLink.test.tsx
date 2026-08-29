import { describe, expect, it } from 'vitest';

const markup = '<a href="/" aria-label="Ross PDF Editor home"><img src="/assets/ross-pdf-editor-mark.svg" alt="Ross PDF Editor" /></a>';

describe('BrandLink', () => {
  it('links to the canonical home route', () => {
    expect(markup).toContain('href="/"');
  });
  it('uses an accessible label and logo alt text', () => {
    expect(markup).toContain('aria-label="Ross PDF Editor home"');
    expect(markup).toContain('alt="Ross PDF Editor"');
  });
});
