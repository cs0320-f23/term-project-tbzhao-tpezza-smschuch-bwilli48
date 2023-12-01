import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests broadband for 0 args
 */
test("broadband no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests broadband for 1 args
 */
test("broadband one arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests broadband for 3 args
 */
test("broadband 3 args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California> <Orange County> <third>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests broadband success
 */
test("broadband succes", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();
});

/**
 * this tests broadband bad state
 */
test("broadband bad state", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <Woah> <Orange County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "State 'Woah' was not found. Make sure it is spaced correctly. Examples: Maine, Rhode Island"
    )
  ).toBeVisible();
});

/**
 * this tests broadband bad county
 */
test("broadband bad county", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California> <Orange Place>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Orange Place' was not found. Make sure it is spaced correctly. Example: Orange County"
    )
  ).toBeVisible();
});

/**
 * this tests broadband county too small
 */
test("broadband county too small", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California> <Alpine County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Alpine County' does not meet the ACS's population threshold of over 50,000, so its data was not surveyed. We apologize for not being able to give you the desired information."
    )
  ).toBeVisible();
});

/**
 * this tests broadband success after county too small
 */
test("broadband success after county too small", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("broadband <California> <Alpine County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Alpine County' does not meet the ACS's population threshold of over 50,000, so its data was not surveyed. We apologize for not being able to give you the desired information."
    )
  ).toBeVisible();

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();
});

/**
 * this tests broadband success after invalid command, load, and mode
 */
test("broadband success after invalid command, load, and mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("BADDDD");
  await submitButton.click();

  await inputBox.fill(
    "load_file </Users/tyype1/Desktop/Brown/sem3/CS32/Projects/repl-kganesh-tpezza/repl/ServerRepl/data/census/dol_ri_earnings_disparity.csv>"
  );
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("Output: 93.0%")).toBeVisible();
});
