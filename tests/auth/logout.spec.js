import { test, expect } from '@playwright/test';
import { login } from "../utils/auth";

test('user can log out successfully', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/dashboard/);

  await page.getByTestId('logout-button').click();

  await expect(page).toHaveURL(/login/);
});