import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * this tests mocked search
 */
test("mock search", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.fill("#searchInput", "Mock A");

  await page.click("text=Search");

  await expect(page.getByText("Snowfall: 12in")).toBeVisible();
});

/**
 * this tests mocked search after search
 */
test("mock search after search", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.fill("#searchInput", "Mock A");

  await page.click("text=Search");

  await expect(page.getByText("Snowfall: 12in")).toBeVisible();

  await page.fill("#searchInput", "Mock B");

  await page.click("text=Search");

  await expect(page.getByText("Snowfall: 11in")).toBeVisible();
});

// /**
//  * this tests mocked search fail
//  */
// test("mock search fail", async ({ page }) => {
//   await page.goto("http://localhost:8000/");

//   await expect(page.getByText("Mock Mode: Off")).toBeVisible();

//   await page.click("text=Mock Mode: Off");
//   await expect(page.getByText("Mock Mode: On")).toBeVisible();

//   await page.fill("#searchInput", "Mock L");

//   await page.click("text=Search");

//   await expect(page.getByText("Resort Not Found")).toBeVisible();
// });

/**
 * this tests mocked sort Snowfall
 */
test("mock sort snowfall", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click("text=See methods...");
  await page.click("text=Snowfall Amount");
  await page.click("text=Sort");

  await expect(page.getByText("Snowfall: 90in")).toBeVisible();
});

/**
 * this tests mocked sort last
 */
test("mock sort last", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click("text=See methods...");
  await page.click("text=Last Snowfall");
  await page.click("text=Sort");

  await expect(page.getByText("Snowfall: 71in")).toBeVisible();
});

/**
 * this tests mocked sort last after seach
 */
test("mock sort last after search", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.fill("#searchInput", "Mock A");

  await page.click("text=Search");

  await expect(page.getByText("Snowfall: 12in")).toBeVisible();

  await page.click("text=See methods...");
  await page.click("text=Last Snowfall");
  await page.click("text=Sort");

  await expect(page.getByText("Snowfall: 71in")).toBeVisible();
});

/**
 * this tests mocked sort last after pref
 */
test("mock sort last after pref", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 11in")).toBeVisible();

  await page.click("text=See methods...");
  await page.click("text=Last Snowfall");
  await page.click("text=Sort");

  await expect(page.getByText("Snowfall: 71in")).toBeVisible();
});
