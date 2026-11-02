import { expect, test, type Locator } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function presentation(locator: Locator, properties: string[]) {
  return locator.evaluate((element, names) => {
    const style = getComputedStyle(element);
    return Object.fromEntries(names.map((name) => [name, style.getPropertyValue(name)]));
  }, properties);
}

for (const theme of ['dark', 'light']) {
  test(`station Clear Query stays in the settings footer below Cancel · ${theme}`, async ({ page }) => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/?page=rail-details-full&railEntityType=Station&theme=${theme}`);
      const panel = page.getByRole('complementary', { name: 'Station rail configuration' });
      await expect(panel.getByRole('button', { name: 'Clear Query', exact: true })).toHaveCount(0);
      await page.getByRole('tab', { name: 'Content Query', exact: true }).click();
      await expect(panel.getByRole('button', { name: 'Clear Query', exact: true })).toHaveCount(0);
      await page.getByRole('textbox', { name: 'Location URI', exact: true }).fill('urn:theplatform:tv:location:london');
      const footer = panel.locator('footer[aria-label="Unsaved changes"]');
      await expect(footer.getByRole('button')).toHaveText([' Save changes', 'Cancel', 'Clear Query']);
      const clear = footer.getByRole('button', { name: 'Clear Query', exact: true });
      const cancel = footer.getByRole('button', { name: 'Cancel', exact: true });
      await expect(clear).toHaveClass(/cvp-text-button--default/);
      await expect(clear).toHaveCSS('border-top-width', '0px');
      expect(await presentation(clear, ['color'])).not.toEqual(await presentation(cancel, ['color']));
      const clearRect = (await clear.boundingBox())!;
      const cancelRect = (await cancel.boundingBox())!;
      expect(Math.abs(clearRect.width - cancelRect.width)).toBeLessThan(2);
      expect(clearRect.y).toBeGreaterThanOrEqual(cancelRect.y + cancelRect.height);
      await expect(clear).toBeInViewport();
      const footerRect = (await footer.boundingBox())!;
      const panelRect = (await panel.boundingBox())!;
      expect(Math.abs(footerRect.y + footerRect.height - panelRect.y - panelRect.height)).toBeLessThan(2);
      await panel.getByRole('tabpanel', { name: 'Content Query', exact: true }).locator('.rail-details__form').evaluate((element) => { element.scrollTop = element.scrollHeight; });
      expect((await footer.boundingBox())!.y).toBeCloseTo(footerRect.y, 0);
      await clear.click();
      await expect(page.getByRole('textbox', { name: 'Location URI', exact: true })).toHaveValue('');
      await expect(panel.locator('footer[aria-label="Unsaved changes"]')).toHaveCount(0);
      await expect(panel.getByRole('button', { name: 'Clear Query', exact: true })).toHaveCount(0);
      await expect(panel.locator('footer[aria-label="Query actions"]')).toHaveCount(0);
      const direction = page.getByRole('button', { name: 'Sort direction: ASC. Activate to switch.', exact: true });
      await direction.click();
      await expect(clear).toBeInViewport();
      await page.getByRole('button', { name: 'Sort direction: DESC. Activate to switch.', exact: true }).click();
      await expect(panel.getByRole('button', { name: 'Clear Query', exact: true })).toHaveCount(0);
    }
  });

  test(`sort field and direction share a row except at very narrow widths · ${theme}`, async ({ page }) => {
    for (const width of [1440, 900, 390, 240]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/?page=rail-details-full&railEntityType=Station&theme=${theme}`);
      await page.getByRole('tab', { name: 'Content Query', exact: true }).click();
      const sort = page.locator('.cvp-sort-control');
      const field = sort.getByRole('combobox');
      const direction = sort.getByRole('button', { name: 'Sort direction: ASC. Activate to switch.', exact: true });
      const layout = await sort.evaluate((element) => {
        const dropdown = element.querySelector('.cvp-sort-control__select')!;
        const button = element.querySelector('.cvp-sort-control__direction')!;
        const fieldRect = dropdown.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        return { width: element.clientWidth, fieldCenter: fieldRect.top + fieldRect.height / 2, fieldBottom: fieldRect.bottom, buttonCenter: buttonRect.top + buttonRect.height / 2, buttonTop: buttonRect.top, rightGap: element.getBoundingClientRect().right - buttonRect.right };
      });
      expect(Math.abs(layout.rightGap)).toBeLessThan(2);
      if (width === 240) {
        expect(layout.width).toBeLessThanOrEqual(224);
        expect(layout.buttonTop).toBeGreaterThanOrEqual(layout.fieldBottom);
      } else {
        expect(layout.width).toBeGreaterThan(224);
        expect(Math.abs(layout.fieldCenter - layout.buttonCenter)).toBeLessThan(2);
      }
      await direction.click();
      await expect(sort.getByRole('button', { name: 'Sort direction: DESC. Activate to switch.', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(field).toHaveText('Channel number');
    }
  });

  test(`station immutable fields match editorial read-only inputs · ${theme}`, async ({ page }) => {
    await page.goto(`/?page=rail-details-full&theme=${theme}`);
    const editorial = page.getByRole('textbox', { name: 'Rail Audience URL', exact: true });
    await expect(editorial).toBeDisabled();
    const properties = ['background-color', 'color', 'border-top-color', 'border-top-width', 'border-radius', 'opacity', 'cursor'];
    const expected = await presentation(editorial, properties);
    await page.goto(`/?page=rail-details-full&railEntityType=Station&theme=${theme}`);
    for (const label of ['Rail entity type', 'Rail behavior']) {
      const field = page.getByRole('textbox', { name: label, exact: true });
      await expect(field).toBeDisabled();
      await expect(field).toHaveAttribute('readonly', '');
      expect(await presentation(field, properties)).toEqual(expected);
    }
    const collection = page.getByRole('combobox', { name: 'Rail collection', exact: true });
    await expect(collection).toBeDisabled();
    await expect(collection).not.toHaveAttribute('aria-required', 'true');
    const capacity = page.getByRole('spinbutton', { name: 'Number of content slots', exact: true });
    await expect(capacity).toBeDisabled();
    await expect(capacity).toHaveAttribute('readonly', '');
    await expect(capacity).not.toHaveAttribute('required');
    await expect(page.getByText('Rail collection', { exact: true })).toBeVisible();
    await expect(page.getByText('Number of content slots', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Increase Number of content slots', exact: true })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Decrease Number of content slots', exact: true })).toBeDisabled();
    const indicators = page.getByRole('img', { name: 'Read only', exact: true });
    await expect(indicators).toHaveCount(4);
    await indicators.first().hover();
    await expect(page.getByRole('tooltip')).toHaveText('Read only');
  });

  test(`rail detail chrome is standardized · ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    let standardButton: Record<string, string> | undefined;
    let standardConfirmation: Record<string, string> | undefined;
    let standardIndicator: Record<string, string> | undefined;
    let standardHeading: Record<string, string> | undefined;
    const buttonProperties = ['color', 'background-color', 'font-family', 'font-size', 'font-weight', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-radius', 'height'];
    const variants = [
      { route: 'rail-details-full', label: 'Editorial' },
      { route: 'personalized-rail-details-full', label: 'Personalized' },
      { route: 'rail-details-full&railEntityType=Station', label: 'Station' },
    ];
    for (const variant of variants) {
      await page.goto(`/?page=${variant.route}&theme=${theme}`);
      const heading = page.getByRole('heading', { name: 'Settings', exact: true, level: 2 });
      await expect(heading).toBeVisible();
      const header = heading.locator('..');
      await expect(header).toHaveCSS('min-height', '48px');
      const headingStyle = await presentation(heading, ['font-family', 'font-size', 'font-weight', 'line-height']);
      standardHeading ??= headingStyle;
      expect(headingStyle).toEqual(standardHeading);
      const indicator = page.locator('.cvp-status-tag');
      await expect(indicator).toHaveText(variant.label);
      expect(await indicator.evaluate((element) => {
        const parent = element.parentElement!;
        return Math.abs(parent.getBoundingClientRect().right - element.getBoundingClientRect().right - parseFloat(getComputedStyle(parent).paddingRight));
      })).toBeLessThan(2);
      const indicatorStyle = await presentation(indicator, ['font-family', 'font-size', 'font-weight', 'line-height', 'text-transform', 'background-color']);
      standardIndicator ??= indicatorStyle;
      expect(indicatorStyle).toEqual(standardIndicator);
      const deletion = page.getByRole('complementary').getByRole('button', { name: 'Delete rail', exact: true });
      await deletion.scrollIntoViewIfNeeded();
      await expect(deletion).toHaveClass(/cvp-text-button--secondary/);
      const deleteStyle = await presentation(deletion, buttonProperties);
      standardButton ??= deleteStyle;
      expect(deleteStyle).toEqual(standardButton);
      await deletion.click();
      const confirmation = page.getByRole('dialog').getByRole('button', { name: 'Delete rail', exact: true });
      await expect(confirmation).toHaveClass(/cvp-text-button--secondary/);
      const confirmationStyle = await presentation(confirmation, buttonProperties);
      standardConfirmation ??= confirmationStyle;
      expect(confirmationStyle).toEqual(standardConfirmation);
      await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
    }
  });
}

test('personalized Settings keeps its mobile close and reopen actions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?page=personalized-rail-details-full&theme=dark');
  await expect(page.getByRole('heading', { name: 'Settings', level: 2 })).toBeVisible();
  await page.getByRole('button', { name: 'Close configuration', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Settings', level: 2 })).toHaveCount(0);
  await page.getByRole('button', { name: 'Open configuration', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Settings', level: 2 })).toBeVisible();
});

test('Rail Details showcases station variants without a separate navigation page', async ({ page }) => {
  await page.goto('/?page=rail-details');
  await expect(page.getByRole('heading', { name: 'Rail Details', exact: true })).toBeVisible();
  await expect(page.getByText('Station Rail Details', { exact: true })).toHaveCount(0);
  for (const theme of ['dark', 'light']) {
    await expect(page.getByRole('button', { name: `Open rail details · ${theme}`, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: `Open personalized · ${theme}`, exact: true })).toBeVisible();
    const opened = page.waitForEvent('popup');
    await page.getByRole('button', { name: `Open station · ${theme}`, exact: true }).click();
    const preview = await opened;
    await expect(preview).toHaveURL(new RegExp(`page=rail-details-full&railEntityType=Station&theme=${theme}`));
    await expect(preview.getByRole('heading', { name: 'Featured stations', level: 1 })).toBeVisible();
    await preview.close();
  }
});

test('creates a station rail in the manager and persists its configuration', async ({ page }) => {
  await page.goto('/?page=rails-list-full&theme=light');
  await page.getByRole('button', { name: 'Create rail', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Create Rail', exact: false });
  await dialog.getByRole('radio', { name: /Station Rail/ }).click();
  await expect(dialog.getByRole('radio', { name: 'Personalized', exact: false })).toBeDisabled();
  await expect(dialog.getByRole('radio', { name: 'Hybrid', exact: false })).toBeDisabled();
  await dialog.getByRole('textbox', { name: 'Rail Name' }).fill('Station integration test');
  await dialog.getByRole('combobox', { name: 'Rail Collection' }).click();
  await page.getByRole('option', { name: 'Home', exact: true }).click();
  await dialog.getByRole('button', { name: 'Create Rail', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Edit Station integration test', exact: true }).click();
  await expect(page).toHaveURL(/page=rail-details-full&railEntityType=Station/);
  await expect(page.getByRole('heading', { name: 'Station integration test', exact: true, level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Add station', exact: true }).click();
  await page.getByRole('button', { name: 'Add WNEWS 101', exact: true }).click();
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Unpin slot 1', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Rails List' }).click();
  await expect(page.getByRole('button', { name: 'Edit Station integration test' })).toBeVisible();
});

test('end-user location overrides are exact and do not edit the rail', async ({ page }) => {
  await page.goto('/?page=rail-details-full&railEntityType=Station&theme=dark');
  await page.getByRole('combobox', { name: 'Preview audience' }).click();
  await page.getByRole('option', { name: 'End user · RAS concept' }).click();
  await page.getByRole('textbox', { name: 'Location override' }).fill('urn:theplatform:tv:location:any');
  await expect(page.getByText('Station rail · 2 of 10 slots populated')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save changes', exact: true })).not.toBeVisible();
  await page.getByRole('textbox', { name: 'Location override' }).fill('invalid');
  await expect(page.getByText('Enter an absolute Location URI.', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Location override' }).clear();
  await expect(page.getByText('Station rail · 5 of 10 slots populated')).toBeVisible();
});

for (const theme of ['dark', 'light']) {
  for (const width of [1440, 390]) {
    test(`station workspace reflows · ${theme} · ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/?page=rail-details-full&railEntityType=Station&theme=${theme}`);
      await expect(page.getByRole('heading', { name: 'Featured stations', exact: true, level: 1 })).toBeVisible();
      const scroller = page.locator('.station-rail__screen .cvp-rail-gallery__items--rail');
      expect(await scroller.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
      const tile = page.locator('.station-rail__screen .cvp-rail-gallery__media').first();
      expect(await tile.evaluate((element) => Math.abs(element.clientWidth - element.clientHeight))).toBeLessThan(2);
      const next = page.getByRole('button', { name: 'Next items' });
      await expect(next).toBeEnabled();
      await next.click();
      await expect.poll(() => scroller.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
      await page.getByRole('button', { name: 'Previous items' }).click();
      await expect.poll(() => scroller.evaluate((element) => element.scrollLeft)).toBeLessThan(2);
      const logos = page.getByRole('img', { name: 'World news sample logo' });
      await expect(logos).toHaveCount(2);
      await page.getByRole('button', { name: 'Open World news', exact: true }).first().click();
      await expect(page.getByRole('dialog', { name: 'World news', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Close', exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const violations = await page.evaluate(async () => {
        const results = await (window as typeof window & { axe: typeof import('axe-core') }).axe.run({
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        });
        return results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }));
      });
      expect(violations).toEqual([]);
      await page.getByRole('button', { name: 'Add station', exact: true }).click();
      await page.getByRole('textbox', { name: 'Station content GUID' }).fill('not-a-guid');
      await page.getByRole('button', { name: 'Add by GUID' }).click();
      await expect(page.getByRole('textbox', { name: 'Station content GUID' })).toHaveValue('not-a-guid');
      await expect(page.getByRole('dialog')).toBeVisible();
    });
  }
}
