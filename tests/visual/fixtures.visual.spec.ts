import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const fixtureRegistry = JSON.parse(readFileSync(new URL('../../src/agent/registry/fixtures.json', import.meta.url), 'utf8')) as {
  themes: Array<'dark' | 'light'>;
  viewports: Array<{ id: string; width: number; height: number }>;
  fixtures: Array<{ id: string; route: string; heading: string }>;
};

for (const fixture of fixtureRegistry.fixtures) {
  for (const theme of fixtureRegistry.themes) {
    for (const viewport of fixtureRegistry.viewports) {
      test(`${fixture.id} · ${theme} · ${viewport.id}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`/${fixture.route}&theme=${theme}`);
        await expect(page.getByRole('heading', { name: fixture.heading, exact: true }).first()).toBeVisible();
        await expect(page).toHaveScreenshot(`${fixture.id}-${theme}-${viewport.id}.png`, {
          fullPage: true,
          animations: 'disabled',
          caret: 'hide',
          scale: 'css',
          maxDiffPixelRatio: 0.01,
        });
      });
    }
  }
}
