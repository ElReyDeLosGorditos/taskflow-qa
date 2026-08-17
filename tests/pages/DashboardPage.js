//Uses "Page Object Model (POM)"
//Instead of tests knowing where every button and input is, each page knows how to interact with itself.
export class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async logout() {
    await this.page.getByTestId("logout-button").click();
  }

  async openCreateTask() {
    await this.page.getByTestId("create-task-btn").click();
  }

  async taskVisible(title) {
    return this.page.getByText(title).isVisible();
  }
}