const { test, expect } = require('@playwright/test');

test('index page loads and has login trigger', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/index.html');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('#start-btn')).toBeVisible();
  await expect(page.locator('#start-btn')).toContainText(/start/i);
});