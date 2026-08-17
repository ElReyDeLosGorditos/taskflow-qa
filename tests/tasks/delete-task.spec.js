import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TaskModal } from "../pages/TaskModal";

test("user can delete a task", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const taskModal = new TaskModal(page);

  await loginPage.goto();
  await loginPage.login();

  const title = `Delete Test ${Date.now()}`;

  await dashboard.openCreateTask();
  await taskModal.createTask(title, "Temporary task");

  // Find the specific task we just created
  const taskCard = page.getByTestId(/^task-card-/).filter({
    has: page.getByText(title),
  });

  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await taskCard.getByRole("button", { name: "Delete" }).click();

  // Wait for that exact card to disappear
  await expect(taskCard).toHaveCount(0);
});