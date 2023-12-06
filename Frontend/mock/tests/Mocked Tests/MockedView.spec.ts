import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests mocked_view with args
 */
test("mocked_view no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_view <ar>");
  await submitButton.click();

  await expect(
    page.getByText("To view, input must be just 'view''")
  ).toBeVisible();
});

/**
 * this tests successful mocked_view
 */
test("mocked_view success", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("State");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests successful mocked_view on a loaded file replacing a
 * previously loaded file
 */
test("mocked_view success after loading new file", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_load_file <csv1>");
  await submitButton.click();

  await inputBox.fill("mocked_view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("State");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("RI");
});
