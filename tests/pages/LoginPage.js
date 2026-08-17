//Uses "Page Object Model (POM)"
//Instead of tests knowing where every button and input is, each page knows how to interact with itself.
export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login() {
    await this.page.getByTestId("login-email")
        .fill(process.env.PLAYWRIGHT_EMAIL);

    await this.page.getByTestId("login-password")
        .fill(process.env.PLAYWRIGHT_PASSWORD);

    await this.page.getByTestId("login-button").click();
  }
}