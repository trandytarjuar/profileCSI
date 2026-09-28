import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { chapters } from '../data/community';
import { chapterGroups } from '../data/chapter-map';

test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  await page.goto('/');
});

test('all chapters can be selected from the list and profile routes exist', async ({ page, request }) => {
  const list = page.getByRole('group', { name: 'Daftar chapter', exact: true });
  await expect(list.getByRole('button')).toHaveCount(chapters.length);
  for (const chapter of chapters) {
    await list.getByRole('button', { name: `${chapter.code} ${chapter.name}`, exact: true }).click();
    const panel = page.getByRole('complementary', { name: 'Informasi chapter' });
    await expect(panel.getByRole('heading', { name: `CSI ${chapter.name}`, exact: true })).toBeVisible();
    await expect(panel.getByRole('link', { name: 'Lihat Profil Chapter' })).toHaveAttribute('href', '/under-construction');
    expect((await request.get(`/chapter/${chapter.slug}`)).status()).toBe(200);
  }
});

test('every chapter can be selected via a marker, with keyboard focus after zoom', async ({ page }) => {
  await page.getByRole('button', { name: 'Perbesar Jabodetabek dan Cikapur, 8 chapter' }).click();
  await expect(page.getByRole('button', { name: 'Pilih CSI Jakarta', exact: true })).toBeFocused();
  for (const chapter of chapters.filter(chapter => chapter.group !== 'CHAPTER MANDIRI')) {
    const marker = page.getByRole('button', { name: `Pilih CSI ${chapter.name}`, exact: true });
    await marker.click();
    await expect(marker).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('status')).toContainText(`CSI ${chapter.name} dipilih`);
  }
  await page.getByRole('button', { name: 'Reset peta' }).click();
  for (const chapter of chapters.filter(chapter => chapter.group === 'CHAPTER MANDIRI')) {
    await page.getByRole('button', { name: `Pilih CSI ${chapter.name}`, exact: true }).click();
    await expect(page.getByRole('status')).toContainText(`CSI ${chapter.name} dipilih`);
  }
});

test('filters, counts, selected panel and reset stay in sync', async ({ page }) => {
  const filters = page.getByRole('group', { name: 'Filter chapter' });
  for (const group of chapterGroups) {
    const matching = chapters.filter(chapter => chapter.group === group.value);
    await filters.getByRole('button', { name: `${group.label} ${matching.length}`, exact: true }).click();
    await expect(page.getByRole('group', { name: 'Daftar chapter', exact: true }).getByRole('button')).toHaveCount(matching.length);
    await expect(page.locator('[data-map-pin]')).toHaveCount(matching.length);
    await expect(page.getByRole('status')).toContainText(`CSI ${matching[0].name} dipilih`);
  }
  await page.getByRole('button', { name: 'Reset peta' }).click();
  await expect(filters.getByRole('button', { name: `Semua Chapter ${chapters.length}` })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText('Tampilan nasional');
});

test('available data and missing data are honestly represented', async ({ page }) => {
  await page.getByRole('button', { name: 'Pilih CSI Deli Serdang', exact: true }).click();
  const panel = page.getByRole('complementary', { name: 'Informasi chapter' });
  await expect(panel.getByText('Ardi Poetra', { exact: true })).toBeVisible();
  await expect(panel.getByRole('img', { name: 'Foto Ardi Poetra' })).toBeVisible();
  await expect(panel.getByRole('link', { name: /Lihat 2 foto/ })).toHaveAttribute('href', '/chapter/deli-serdang#chapter-gallery-title');
  await expect(panel.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', chapters.find(chapter => chapter.slug === 'deli-serdang')!.instagram!.url);
  await page.getByRole('button', { name: 'Pilih CSI Semarang', exact: true }).click();
  await expect(panel.getByText('Data pengurus belum tersedia', { exact: true })).toBeVisible();
  await expect(panel.getByText('Dokumentasi kegiatan belum tersedia.')).toBeVisible();
  await expect(panel.getByText('Kontak resmi belum tersedia.')).toBeVisible();
});

test('keyboard selection, visible focus and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const marker = page.getByRole('button', { name: 'Pilih CSI Deli Serdang', exact: true });
  await marker.focus();
  await page.keyboard.press('Enter');
  await expect(marker).toHaveAttribute('aria-pressed', 'true');
  await expect(marker).toHaveCSS('outline-style', 'solid');
  const selected = page.getByRole('heading', { name: 'CSI Deli Serdang', exact: true });
  expect(await selected.evaluate(element => getComputedStyle(element.closest('aside')!.firstElementChild!.nextElementSibling!).animationName)).toBe('none');
  const first = page.getByRole('group', { name: 'Daftar chapter', exact: true }).getByRole('button').first();
  await first.focus(); await page.keyboard.press('Space');
  await expect(page.getByRole('status')).toContainText('CSI Jakarta dipilih');
});

test('mobile map and selected panel do not overflow', async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.getByRole('button', { name: 'Reset peta' }).click();
    for (const chapter of chapters.filter(chapter => chapter.group === 'CHAPTER MANDIRI')) {
      await page.getByRole('button', { name: `Pilih CSI ${chapter.name}`, exact: true }).click();
    }
    await page.getByRole('button', { name: 'Pilih CSI Deli Serdang', exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Perbesar Jabodetabek dan Cikapur, 8 chapter' }).click();
    for (const marker of await page.locator('[data-map-pin]').all()) {
      await marker.click();
      await expect(marker).toHaveAttribute('aria-pressed', 'true');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('no hydration or runtime errors and map remains usable if SVG fails', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Pilih CSI Deli Serdang', exact: true }).click();
  expect(errors.filter(error => !error.includes('net::ERR_FAILED'))).toEqual([]);
  await page.route('**/maps/indonesia.svg', route => route.abort());
  await page.reload();
  await expect(page.getByText('Peta belum dapat dimuat. Pilih chapter dari daftar di bawah.')).toBeVisible();
  await page.getByRole('group', { name: 'Daftar chapter', exact: true }).getByRole('button').first().click();
  await expect(page.getByRole('status')).toContainText('CSI Jakarta dipilih');
});

test('territory map passes automated WCAG A/AA checks in overview and selected states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const select of [false, true]) {
    if (select) await page.getByRole('button', { name: 'Pilih CSI Deli Serdang', exact: true }).click();
    const results = await new AxeBuilder({ page }).include('#territory').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});
