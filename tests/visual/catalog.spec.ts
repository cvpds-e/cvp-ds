import { expect, test } from '@playwright/test';
import axe from 'axe-core';
import { DESIGN_SYSTEM_CATALOG, FOUNDATION_PAGES, PRIMITIVE_PAGES } from '../../src/app/designSystemCatalog';

declare global {
  interface Window {
    axe: typeof import('axe-core');
  }
}

test('all catalogue entries have real routes, not the overview fallback', async ({ page }) => {
  for (const entry of DESIGN_SYSTEM_CATALOG.filter(entry => entry.id !== 'overview')) {
    await page.goto(`/?page=${entry.id}`);
    await expect(page.locator('.app__main h1').first(), entry.id).toBeVisible();
    await expect(page.locator('.app__main h1').first(), entry.id).not.toHaveText('CVP Design System');
  }
});

test('new primitives are individually reachable through the main navigation and browser history', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Design system catalogue' })).toBeVisible();
  const nav = page.getByRole('navigation', { name: 'Design system navigation' });
  const search = nav.getByRole('searchbox');
  for (const entry of PRIMITIVE_PAGES) {
    await search.fill(entry.label);
    await nav.getByRole('button', { name: entry.label, exact: true }).click();
    await expect(page.locator('.app__main h1')).toHaveText(entry.label);
    await expect(nav.getByRole('button', { name: entry.label, exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(page).toHaveURL(new RegExp(`page=${entry.id}$`));
  }
  await page.goBack();
  await expect(page.locator('.app__main h1')).toHaveText('Button Group');
});

for (const theme of ['dark', 'light']) {
  for (const width of [320, 768, 1440]) {
    test(`catalogue reflow and AA checks · ${theme} · ${width}`, async ({ page }) => {
      await page.addInitScript(value => localStorage.setItem('theme', value), theme);
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/?page=components');
      await expect(page.locator('.app')).toHaveCSS('background-color', theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(13, 13, 20)');
      if (width <= 768) {
        await expect(page.locator('.design-system-nav')).toBeHidden();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: /Switch to .* mode/ })).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('link', { name: 'Browse design system', exact: true })).toBeFocused();
      } else {
        await expect(page.locator('.design-system-nav')).toBeVisible();
      }
      await expect(page.locator('.app__main h1')).toHaveText('All Components & Foundations');
      await expect(page.getByRole('region', { name: 'Design system catalogue' }).getByRole('link')).toHaveCount(DESIGN_SYSTEM_CATALOG.length);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => {
        const results = await window.axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
        return results.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }));
      });
      expect(violations).toEqual([]);
      await page.getByRole('searchbox', { name: 'Search the complete catalogue' }).fill('divider');
      await page.getByRole('region', { name: 'Design system catalogue' }).getByRole('link', { name: /^Separator/ }).click();
      await expect(page.locator('.app__main h1')).toHaveText('Separator');
      if (width <= 768) {
        await page.getByRole('link', { name: 'Browse design system', exact: true }).click();
        await expect(page.locator('.app__main h1')).toHaveText('All Components & Foundations');
      }
    });
  }
}

for (const theme of ['dark', 'light']) {
  test(`individual primitive and foundation pages reflow and pass AA checks · ${theme}`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem('theme', value), theme);
    await page.setViewportSize({ width: 320, height: 900 });
    const entries = [...PRIMITIVE_PAGES, ...FOUNDATION_PAGES, ...DESIGN_SYSTEM_CATALOG.filter(entry => ['date-input', 'time-input', 'file-input', 'unsaved-changes-footer'].includes(entry.id))];
    for (const entry of entries) {
      await page.goto(`/?page=${entry.id}`);
      await expect(page.locator('.app')).toHaveCSS('background-color', theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(13, 13, 20)');
      await expect(page.locator('.app__main h1')).toHaveText(entry.label);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), entry.id).toBe(false);
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => {
        const results = await window.axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
        return results.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }));
      });
      expect(violations, entry.id).toEqual([]);
    }
  });
}
