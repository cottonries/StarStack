const { test, expect } = require('@playwright/test');

test.describe('Workout flow', () => {
  test('user can select workout options and generate a workout video', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/workout.html');
    await page.waitForLoadState('domcontentloaded');

    await page.selectOption('#intensity', 'easy');
    await page.selectOption('#equipment', 'none');
    await page.click('#findBtn');

    await expect(page.locator('#player')).toBeVisible();
  });

  test('user can log a workout', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/workout.html');
    await page.waitForLoadState('domcontentloaded');

    await page.selectOption('#intensity', 'easy');
    await page.selectOption('#equipment', 'none');
    await page.click('#findBtn');

    await expect(page.locator('#player')).toBeVisible();

    await page.click('#logWorkoutBtn');
    await expect(page.locator('#msg')).toContainText(/workout logged/i);
  });
});
