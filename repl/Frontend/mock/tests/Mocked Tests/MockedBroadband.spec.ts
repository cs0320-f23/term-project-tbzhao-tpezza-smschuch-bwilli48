import { test, expect } from "@playwright/test";

let submitButton;
let inputBox;
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests mocked_broadband for 0 args
 */
test("mocked_broadband no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband for 1 args
 */
test("mocked_broadband one arg", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband for 3 args
 */
test("mocked_broadband 3 args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California> <Orange County> <third>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband success
 */
test("mocked_broadband succes", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();
});

/**
 * this tests mocked_broadband bad state
 */
test("mocked_broadband bad state", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <Cali> <Orange County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "State 'Cali' was not found. Make sure it is spaced correctly. Examples: Maine, Rhode Island"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband bad county
 */
test("mocked_broadband bad county", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California> <Orange Counter>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Orange Counter' was not found. Make sure it is spaced correctly. Example: Orange County"
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband county too small
 */
test("mocked_broadband county too small", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California> <Alpine County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Alpine County' does not meet the ACS's population threshold of over 50,000, so its data was not surveyed. We apologize for not being able to give you the desired information."
    )
  ).toBeVisible();
});

/**
 * this tests mocked_broadband success after county too small
 */
test("mocked_broadband success after county too small", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mocked_broadband <California> <Alpine County>");
  await submitButton.click();

  await expect(
    page.getByText(
      "County 'Alpine County' does not meet the ACS's population threshold of over 50,000, so its data was not surveyed. We apologize for not being able to give you the desired information."
    )
  ).toBeVisible();

  await inputBox.fill("mocked_broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();
});

/**
 * this tests mocked_broadband success after invalid command, load, and mode
 */
test("mocked_broadband success after invalid command, load, and mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("BADDDD");
  await submitButton.click();

  await inputBox.fill("mocked_load_file <csv1>");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await inputBox.fill("mocked_broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("Output: 93.0%")).toBeVisible();
});
