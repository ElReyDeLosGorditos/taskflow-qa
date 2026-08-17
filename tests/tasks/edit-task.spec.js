import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TaskModal } from "../pages/TaskModal";

test("user can edit a task", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const taskModal = new TaskModal(page);

  await loginPage.goto();
  await loginPage.login();

  // Create a unique task first
  const originalTitle = `Edit Test ${Date.now()}`;

  await dashboard.openCreateTask();
  await taskModal.createTask(originalTitle, "Original description");

  await expect(page.getByText(originalTitle)).toBeVisible();

  // Edit the task we just created
  const taskCard = page.getByTestId(/^task-card-/).first();

  await taskCard.getByRole("button", { name: "Edit" }).click();

  const updatedTitle = `${originalTitle} Updated`;

  await taskModal.updateTask(updatedTitle, "Updated description", "done");

  await expect(page.getByText(updatedTitle)).toBeVisible();
});