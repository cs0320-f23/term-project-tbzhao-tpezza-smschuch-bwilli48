import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:8000");

	// Log in
	await page.click("text=Log In");
	await page.waitForSelector("#username");
	await page.fill("#username", "austinwilliams0404@gmail.com");
	await page.waitForSelector("#password");
	await page.fill("#password", "B7pu&sckP4hIfaEz");
	await page.waitForSelector(
		'button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")'
	);
	await page.click('button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")');

	// Verify successful login
	await page.waitForLoadState("load");
	await expect(page.locator("text=Log Out")).toBeVisible();
});

test("One preference should save and persist", async ({ page }) => {
	// Locate "Weight: 5" through "Snowfall Amount"
	const snowfallAmountRow = page.locator("text=Snowfall Amount").first().locator("xpath=ancestor::tr");
	const weightTextLocator = snowfallAmountRow.locator('p:has-text("Weight:")').first();
	await expect(weightTextLocator).toContainText("Weight: 5");

	// Increase weight and save to account
	await page.click('button[aria-label="Increase weight for Snowfall Amount"]');
	await page.click('button:has-text("Save to Account")');

	// Reload and wait
	await page.reload();

	// Assert that prefs have been saved
	await expect(weightTextLocator).toContainText("Weight: 6");

	// Log out and log back in
	await page.click("text=Log Out");
	await page.click("text=Log In");

	// Enter username and password on Auth0 site.
	await page.waitForSelector("#username");
	await page.fill("#username", "austinwilliams0404@gmail.com");
	await page.waitForSelector("#password");
	await page.fill("#password", "B7pu&sckP4hIfaEz");
	await page.waitForSelector(
		'button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")'
	);
	await page.click('button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")');

	// Verify the updated preference persists after log out and log in
	await expect(weightTextLocator).toContainText("Weight: 6");
});

test("Multiple preferences should save and persist", async ({ page }) => {
	// Find the two prefs to watch
	const snowfallAmountRow = page.locator("text=Snowfall Amount").first().locator("xpath=ancestor::tr");
	const snowfallWeightLocator = snowfallAmountRow.locator('p:has-text("Weight:")').first();
	const baseDepthRow = page.locator("text=Base-depth").first().locator("xpath=ancestor::tr");
	const baseDepthValueLocator = baseDepthRow.locator('p:has-text("Value:")').first();

	// Increase Snowfall Amount weight and decrease Base-depth value
	await page.click('button[aria-label="Increase weight for Snowfall Amount"]');
	await page.click('button[aria-label="Decrease value for Base-depth"]');
	await page.click('button:has-text("Save to Account")');

	// Reload page to check if preferences are saved
	await page.reload();
	await expect(snowfallWeightLocator).toContainText("Weight: 6");
	await expect(baseDepthValueLocator).toContainText("Value: 4");

	// Logout and login again to check if preferences persist
	await page.click("text=Log Out");
	await page.click("text=Log In");
	await page.waitForSelector("#username");
	await page.fill("#username", "austinwilliams0404@gmail.com");
	await page.waitForSelector("#password");
	await page.fill("#password", "B7pu&sckP4hIfaEz");
	await page.waitForSelector(
		'button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")'
	);
	await page.click('button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")');

	// Assert that the updated preferences are still there after re-login
	await expect(snowfallWeightLocator).toContainText("Weight: 6");
	await expect(baseDepthValueLocator).toContainText("Value: 4");
});

test("Preferences should not save without clicking 'Save to Account'", async ({ page }) => {
	// Locate "Weight: 5" through "Snowfall Amount"
	const snowfallAmountRow = page.locator("text=Snowfall Amount").first().locator("xpath=ancestor::tr");
	const weightTextLocator = snowfallAmountRow.locator('p:has-text("Weight:")').first();

	// Assert initial state is as expected
	await expect(weightTextLocator).toContainText("Weight: 5");

	// Increase weight but do NOT save to account
	await page.click('button[aria-label="Increase weight for Snowfall Amount"]');

	// Reload and check if the unsaved preference change persisted (it should not)
	await page.reload();
	await expect(weightTextLocator).toContainText("Weight: 5");

	// Logout and login again to check if preferences persist
	await page.click("text=Log Out");
	await page.click("text=Log In");
	await page.waitForSelector("#username");
	await page.fill("#username", "austinwilliams0404@gmail.com");
	await page.waitForSelector("#password");
	await page.fill("#password", "B7pu&sckP4hIfaEz");
	await page.waitForSelector(
		'button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")'
	);
	await page.click('button[type="submit"].c6141592f.caec746d1.cdc187a19.c03abc822.c94180f35:has-text("Continue")');

	// Verify the initial preference persists after log out and log in
	await expect(weightTextLocator).toContainText("Weight: 5");
});
