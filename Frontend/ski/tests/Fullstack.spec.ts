import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * this real real start
 */
test("real start", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mock Mode: Off")).toBeVisible();

  await expect(page.getByText("Kolasportland")).toBeVisible();

  await expect(page.getByText("Jay Peak")).toBeVisible();
});

/**
 * this real mocked search
 */
// test("real search", async ({ page }) => {
//   await page.goto("http://localhost:8000/");

//   await expect(page.getByText("Mock Mode: Off")).toBeVisible();

//   await expect(page.getByText("Kolasportland")).toBeVisible();

//   await page.fill("#searchInput", "Kolasportland");

//   await page.click("text=Search");

//   await expect(page.getByText("Kolasportland")).toBeVisible();
// });
