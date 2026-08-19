import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test("rapid clicking Create Task should only create one task", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login();

  await dashboard.openCreateTask();

  const title = `Rapid Test ${Date.now()}`;

  await page.getByTestId("task-title").fill(title);
  await page.getByTestId("task-description").fill("Stress test");

  const submit = page.getByTestId("task-submit");

  // Spam-click the button.
  await submit.click({ clickCount: 5 });

  // Wait until the modal closes.
  await expect(page.getByTestId("task-title")).toHaveCount(0);

  // Verify only ONE task exists.
  await expect(page.getByText(title)).toHaveCount(1);
});