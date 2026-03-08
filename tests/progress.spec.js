const { test, expect } = require('@playwright/test');

test('progress page shows logged workouts', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/progress.html');

  await expect(page.locator('#calGrid')).toBeVisible();
  await expect(page.locator('#streakChart')).toBeVisible();
});