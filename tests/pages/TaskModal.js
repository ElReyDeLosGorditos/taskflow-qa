//Uses "Page Object Model (POM)"
//Instead of tests knowing where every button and input is, each page knows how to interact with itself.
export class TaskModal {
  constructor(page) {
    this.page = page;
  }

  async createTask(title, description, status = "todo") {
    await this.page.getByTestId("task-title").fill(title);
    await this.page.getByTestId("task-description").fill(description);
    await this.page.getByTestId("task-status").selectOption(status);
    await this.page.getByTestId("task-submit").click();
  }

  async updateTask(title, description, status) {
    await this.createTask(title, description, status);
  }

  async cancel() {
    await this.page.getByTestId("task-cancel").click();
  }
}