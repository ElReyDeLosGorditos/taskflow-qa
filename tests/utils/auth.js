//Shared Login Helper
export async function login(page) {
  await page.goto("/login");

  await page.getByTestId("login-email").fill("cat@gmail.com");
  await page.getByTestId("login-password").fill("password123");

  await page.getByTestId("login-button").click();
}