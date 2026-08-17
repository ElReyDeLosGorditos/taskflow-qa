import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
//import { login } from "../utils/auth";

test('user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText(/Welcome back/i)).toBeVisible();
});