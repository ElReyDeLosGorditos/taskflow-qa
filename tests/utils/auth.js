export async function login(page) {
  await page.goto("/login");

  await page.getByTestId("login-email").fill(process.env.PLAYWRIGHT_EMAIL);
  await page.getByTestId("login-password").fill(process.env.PLAYWRIGHT_PASSWORD);

  await page.getByTestId("login-button").click();
}