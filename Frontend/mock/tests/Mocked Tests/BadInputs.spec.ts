import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests an invalid command with no arguments
 */
test("bad command", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("bad");
  await submitButton.click();

  await expect(page.getByText("Invalid command")).toBeVisible();
});

/**
 * this tests an invalid command with valid arguments
 */
test("bad command with valid arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("bad <arg>");
  await submitButton.click();

  await expect(page.getByText("Invalid command")).toBeVisible();
});

/**
 * this tests an invalid command with invalid arguments
 */
test("bad command with invalid arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("bad <arg");
  await submitButton.click();

  await expect(
    page.getByText(
      "Improper input. Follow input style: command, command <arg>, command <arg1> <arg2>, etc."
    )
  ).toBeVisible();
});

/**
 * this tests an valid command with invalid arguments
 */
test("valid command with invalid arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <arg");
  await submitButton.click();

  await expect(
    page.getByText(
      "Improper input. Follow input style: command, command <arg>, command <arg1> <arg2>, etc."
    )
  ).toBeVisible();
});

/**
 * this tests a valid command with invalid args for that command
 */
test("valid command invalid args for that command", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});
