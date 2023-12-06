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
 * this tests view with args
 */
test("view no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("view <ar>");
  await submitButton.click();

  await expect(
    page.getByText("To view, input must be just 'view''")
  ).toBeVisible();
});

/**
 * this tests failed view when no csv is loaded
 */
// test("no csv view", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   await inputBox.fill("view");
//   await submitButton.click();

//   await expect(
//     page.getByText("Currently there is no CSV loaded.")
//   ).toBeVisible();
// });

/**
 * this tests successful view
 */
test("view success", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("State");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests successful view on a loaded file replacing a
 * previously loaded file
 */
test("view success after loading new file", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded " + file1)).toBeVisible();

  await inputBox.fill("view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Height");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("51");
});

/**
 * this tests successful view on a loaded file replacing a
 * previously loaded file, and after broadband
 */
test("view success after loading new file and broadband", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("view");
  await submitButton.click();

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();

  await inputBox.fill("view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Height");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("51");
});
