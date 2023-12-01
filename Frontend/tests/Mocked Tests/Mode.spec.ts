import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests that mode starts on brief
 */
test("mode on start", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mode: Brief")).toBeVisible();
});

/**
 * this tests that mode changes to verbose from brief
 */
test("mode on first change", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Verbose")).toBeVisible();
});

/**
 * this tests that mode changes back to brief after changing to verbose
 */
test("mode on second change", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mode");
  await submitButton.click();
  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Brief")).toBeVisible();
});

/**
 * this tests that mode changes with other commands being run as well
 */
test("mode on after load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("concat <abc> <def>");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Verbose")).toBeVisible();
});

/**
 * this tests that mode changes the history display to
 * have Command: ... and Output: ...
 */
test("output and command come up when verbose", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("concat <abc> <def>");
  await submitButton.click();

  await expect(page.getByText("abcdef")).toBeVisible();

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Command: concat <abc> <def>")).toBeVisible();
  await expect(page.getByText("Output: abcdef")).toBeVisible();

  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: Mode was set to verbose")).toBeVisible();
});
