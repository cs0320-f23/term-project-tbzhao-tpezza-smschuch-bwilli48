import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
let file1 =
  "/Users/tyype1/Desktop/Brown/sem3/CS32/Projects/repl-kganesh-tpezza/repl/ServerRepl/data/census/dol_ri_earnings_disparity.csv";
let file2 =
  "/Users/tyype1/Desktop/Brown/sem3/CS32/Projects/repl-kganesh-tpezza/repl/ServerRepl/data/census/even.csv";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests mocked search with  0 args
 */
test("mocked search no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search");
  await submitButton.click();

  await expect(
    page.getByText(
      "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked search with too many args
 */
test("mocked search too many args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search <Header> <Item> <BOOO>");
  await submitButton.click();

  await expect(
    page.getByText(
      "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked search with no results
 */
test("search success with no results", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search <0> <234234>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(
    page.getByText("234234 was not found in column with header '0'.")
  ).toBeVisible();
});

/**
 * this tests mocked search with one result
 */
test("search success with 1 result", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search <1> <1>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");
  // [["72", "1", "12", "61"]]
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("72");
  await expect(resTable.nth(0).locator("td").nth(1)).toHaveText("1");
  await expect(resTable.nth(0).locator("td").nth(2)).toHaveText("12");
  await expect(resTable.nth(0).locator("td").nth(3)).toHaveText("61");
});

/**
 * this tests mocked search with multiple results
 */
test("search success with multi result", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search <State> <RI>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");
  // [["72", "1", "12", "61"]]
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(5)).toHaveText("2%");
  await expect(resTable.nth(4).locator("td").nth(1)).toHaveText(
    "Hispanic/Latino"
  );
  await expect(resTable.nth(0).locator("td").nth(5)).toHaveText("75%");
});

test("search success with multi result, only 1 arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_search <12>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("72");
  await expect(resTable.nth(0).locator("td").nth(1)).toHaveText("1");
  await expect(resTable.nth(0).locator("td").nth(2)).toHaveText("12");
  await expect(resTable.nth(0).locator("td").nth(3)).toHaveText("61");
});
