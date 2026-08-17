import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TaskModal } from "../pages/TaskModal";
//import { login } from "../utils/auth";

test('user can create a task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const taskModal = new TaskModal(page);

    await loginPage.goto();
    await loginPage.login();

    await dashboard.openCreateTask();

    const title = `Playwright Task ${Date.now()}`;

    await taskModal.createTask(
        title,
        "Created automatically"
    );

    await expect(page.getByText(title)).toBeVisible();
});