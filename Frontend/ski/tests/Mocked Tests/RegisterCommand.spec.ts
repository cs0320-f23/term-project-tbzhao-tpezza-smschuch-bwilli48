import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests that concat is readable and outputs correctly
 */
test("registered command concat", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("concat <abc> <def>");
  await submitButton.click();

  await expect(page.getByText("abcdef")).toBeVisible();
});

/**
 * this tests to make sure commands can be invalid
 */
test("registered command with invalid command", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("bad");
  await submitButton.click();

  await expect(page.getByText("Invalid command")).toBeVisible();
});

/**
 * this tests concat with number inputs
 */
test("registered command concat with numbers", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("concat <1> <2>");
  await submitButton.click();

  await expect(page.getByText("12")).toBeVisible();
});

/**
 * this tests the error from concat with bad input
 */
test("registered command concat bad inputs", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("concat <def>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for concat. Must follow 'concat <arg1> <arg2>'"
    )
  ).toBeVisible();
});

/**
 * this tests a valid command can still be called with another registered
 */
test("registered command with other command", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});
