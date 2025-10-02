import { test, expect } from '@playwright/test';

test.describe('Checkout flow', () => {
  test('dashboard loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Tool Jockey' })).toBeVisible();
  });
});
