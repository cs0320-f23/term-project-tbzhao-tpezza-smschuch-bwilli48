import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * this tests prefs mocked with the starting weights
 */
test("mock prefs starter", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 71 in.")).toBeVisible();
});

/**
 * this tests prefs mocked with snowfall amount
 */
test("mock prefs snowfall amount", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click('button[aria-label="Increase value for Snowfall Amount"]');
  await page.click('button[aria-label="Increase value for Snowfall Amount"]');
  await page.click('button[aria-label="Increase value for Snowfall Amount"]');
  await page.click('button[aria-label="Increase value for Snowfall Amount"]');
  await page.click('button[aria-label="Increase value for Snowfall Amount"]');
  await page.click('button[aria-label="Increase value for Snowfall Amount"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 90 in.")).toBeVisible();
});

/**
 * this tests prefs mocked with price
 */
test("mock prefs price", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 11 in.")).toBeVisible();
});

/**
 * this tests prefs mocked with lifts
 */
test("mock prefs lifts", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 12 in.")).toBeVisible();
});

/**
 * this tests prefs mocked with lifts after starting mock
 */
test("mock prefs lifts after start", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 71 in.")).toBeVisible();

  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 12 in.")).toBeVisible();
});

/**
 * this tests prefs mocked with lifts after price mock
 */
test("mock prefs lifts after price mock", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await page.click("text=Mock Mode: Off");
  await expect(page.getByText("Mock Mode: On")).toBeVisible();

  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');
  await page.click('button[aria-label="Increase weight for Price"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 11 in.")).toBeVisible();

  await page.click('button[aria-label="Decrease weight for Price"]');
  await page.click('button[aria-label="Decrease weight for Price"]');
  await page.click('button[aria-label="Decrease weight for Price"]');
  await page.click('button[aria-label="Decrease weight for Price"]');

  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');
  await page.click('button[aria-label="Increase weight for Lifts Open"]');

  await page.click("text=Search By Preference");

  await expect(page.getByText("Snowfall: 12 in.")).toBeVisible();
});
