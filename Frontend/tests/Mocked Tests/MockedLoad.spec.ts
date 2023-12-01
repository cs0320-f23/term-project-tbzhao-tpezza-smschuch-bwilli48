import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
let file1 = "csv1";
let file2 = "csv2";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests mocked_load for 0 args
 */
test("mocked_load no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_load for 2 args
 */
test("mocked_load 2 args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <" + file1 + "> <k>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_load success
 */
test("mocked_load success", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <" + file1 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();
});

/**
 * this tests mocked_load success after load success
 */
test("mocked_load success after success", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <" + file1 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();

  await inputBox.fill("mocked_load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});

/**
 * this tests mocked_load bad path
 */
test("mocked_load bad ptah", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <badpath>");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();
});

/**
 * this tests mocked_load success after bad path
 */
test("mocked_load success after bad", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <badpath>");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();

  await inputBox.fill("mocked_load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});

/**
 * this tests mocked_load success after invalid command, mocked broadband, and mode
 */
test("mocked_load success after invalid command, broadband, and mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("BADDDD");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await inputBox.fill("mocked_broadband <California> <Orange County>");
  await submitButton.click();

  await inputBox.fill("mocked_load_file <" + file2 + ">");
  await submitButton.click();

  await expect(
    page.getByText("Output: Successfully loaded " + file2)
  ).toBeVisible();
});
