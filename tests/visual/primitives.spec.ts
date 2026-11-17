import { expect, test } from '@playwright/test';
import axe from 'axe-core';

declare global {
  interface Window {
    axe: typeof import('axe-core');
  }
}

for (const theme of ['dark', 'light']) {
  for (const width of [320, 768, 1440]) {
    test(`primitive reflow and AA checks · ${theme} · ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/?page=primitives-full&theme=${theme}`);
      await expect(page.getByRole('heading', { name: 'Primitives', exact: true })).toBeVisible();
      const grid = page.getByTestId('primitive-grid');
      const columns = await grid.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
      expect(columns).toBe(width < 600 ? 1 : 2);
      const overflow = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(overflow.content).toBeLessThanOrEqual(overflow.viewport);
      const media = (await page.locator('.cvp-primitives-doc__media').boundingBox())!;
      expect(media.width / media.height).toBeCloseTo(16 / 9, 2);

      for (const control of [
        page.getByRole('switch', { name: 'Notifications', exact: true }),
        page.getByRole('radio', { name: 'Daily', exact: true }),
        page.getByRole('slider', { name: 'Volume', exact: true }),
      ]) {
        const bounds = await control.boundingBox();
        expect(bounds?.width).toBeGreaterThanOrEqual(24);
        expect(bounds?.height).toBeGreaterThanOrEqual(24);
      }

      const contrast = await page.getByRole('radio', { name: 'Daily', exact: true }).evaluate(element => {
        const rgba = (value: string) => value.match(/[\d.]+/g)!.slice(0, 3).map(Number);
        const luminance = (channels: number[]) => channels.map(channel => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        const style = getComputedStyle(element);
        const foreground = luminance(rgba(style.borderTopColor));
        const background = luminance(rgba(style.backgroundColor));
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });
      expect(contrast).toBeGreaterThanOrEqual(3);

      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
        return result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }));
      });
      expect(violations).toEqual([]);
      await expect(page.getByRole('progressbar', { name: 'Pending work' }).locator('.cvp-progress__indicator')).toHaveCSS('animation-name', 'none');
      await expect(page.getByRole('progressbar', { name: 'Completed work' })).toHaveAttribute('aria-valuenow', '25');
      const progressFill = await page.getByRole('progressbar', { name: 'Completed work' }).evaluate(element => element.firstElementChild!.getBoundingClientRect().width / element.getBoundingClientRect().width);
      expect(progressFill).toBeCloseTo(0.5, 2);
    });
  }
}

test('primitive keyboard, pointer, focus and scrolling journeys', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/?page=primitives-full&theme=dark');
  const setting = page.getByRole('switch', { name: 'Notifications', exact: true });
  await setting.focus();
  await page.keyboard.press('Space');
  await expect(setting).toBeChecked();
  await expect(setting).toBeFocused();
  const focus = await setting.evaluate(element => {
    const style = getComputedStyle(element);
    return { visible: element.matches(':focus-visible'), shadow: style.boxShadow };
  });
  expect(focus.visible).toBe(true);
  expect(focus.shadow).not.toBe('none');

  const daily = page.getByRole('radio', { name: 'Daily', exact: true });
  const weekly = page.getByRole('radio', { name: 'Weekly', exact: true });
  await daily.focus();
  await page.keyboard.down('ArrowDown');
  await expect(weekly).toBeFocused();
  await expect(weekly).toBeChecked();
  await page.keyboard.up('ArrowDown');
  await page.keyboard.down('ArrowDown');
  await expect(daily).toBeFocused();
  await expect(daily).toBeChecked();
  await page.keyboard.up('ArrowDown');

  const volume = page.getByRole('slider', { name: 'Volume', exact: true });
  await volume.focus();
  await page.keyboard.press('End');
  await expect(volume).toHaveAttribute('aria-valuenow', '100');
  await page.keyboard.press('Home');
  await expect(volume).toHaveAttribute('aria-valuenow', '0');
  const slider = volume.locator('xpath=ancestor::*[@data-slot="slider"]');
  const bounds = (await slider.boundingBox())!;
  await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await expect(volume).toHaveAttribute('aria-valuenow', /^(4[5-9]|5[0-5])$/);
  const thumb = (await volume.boundingBox())!;
  await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + thumb.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height / 2, { steps: 5 });
  await page.mouse.up();
  expect(Number(await volume.getAttribute('aria-valuenow'))).toBeGreaterThan(65);

  const search = page.getByRole('searchbox', { name: 'Search examples' });
  await search.fill('query');
  await page.getByRole('button', { name: 'Clear search examples' }).click();
  await expect(search).toHaveValue('');
  await expect(search).toBeFocused();

  const save = page.getByRole('button', { name: 'Save changes', exact: true });
  await save.scrollIntoViewIfNeeded();
  await save.focus();
  await expect(page.getByRole('tooltip')).toContainText('native button ref');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  const region = page.getByRole('region', { name: 'Scrollable example' });
  await region.focus();
  await page.keyboard.press('End');
  await expect.poll(() => region.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
});

test('density tokens, motion preference and RTL switch remain composable', async ({ page }) => {
  await page.goto('/?page=primitives-full&theme=light');
  const stack = page.locator('.cvp-primitives-doc > .cvp-container > .cvp-stack');
  const regularGap = await stack.evaluate(element => getComputedStyle(element).gap);
  await stack.evaluate(element => element.setAttribute('data-density', 'compact'));
  const compactGap = await stack.evaluate(element => getComputedStyle(element).gap);
  expect(parseFloat(compactGap)).toBeLessThan(parseFloat(regularGap));

  const setting = page.getByRole('switch', { name: 'Notifications', exact: true });
  await setting.evaluate(element => element.setAttribute('dir', 'rtl'));
  await setting.click();
  const transform = await setting.locator('[data-slot="switch-thumb"]').evaluate(element => getComputedStyle(element).transform);
  expect(transform).toBe('matrix(1, 0, 0, 1, -16, 0)');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const pending = page.getByRole('progressbar', { name: 'Pending work' }).locator('.cvp-progress__indicator');
  await expect(pending).toHaveCSS('animation-name', 'cvp-progress-pending');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(pending).toHaveCSS('animation-name', 'none');
});
