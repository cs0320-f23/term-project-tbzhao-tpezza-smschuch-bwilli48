import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
let file1 = "repl/Backend/data/census/dol_ri_earnings_disparity.csv";
let file2 = "repl/Backend/data/census/even.csv";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests load for 0 args
 */
test("load no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});

/**
 * this tests broadband for 2 args
 */
test("load 2 args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + "> <k>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
    )
  ).toBeVisible();
});

/**
 * this tests load success
 */
test("load success", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();
});

/**
 * this tests load success after load success
 */
test("load success after success", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});

/**
 * this tests load bad path
 */
test("load bad ptah", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <badpath>");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();
});

/**
 * this tests load success after bad path
 */
test("load success after bad", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <badpath>");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});

/**
 * this tests load success after invalid command, broadband, and mode
 */
test("load success after invalid command, broadband, and mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("BADDDD");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(
    page.getByText("Output: Successfully loaded " + file2)
  ).toBeVisible();
});

/**
 * this tests load success after view with no csv
 */
test("load success after view with no csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("view");
  await submitButton.click();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});

/**
 * this tests load success after load success and view success
 */
test("load success after success and view success", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();

  await inputBox.fill("view");
  await submitButton.click();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file2)).toBeVisible();
});
