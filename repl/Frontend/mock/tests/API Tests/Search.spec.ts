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
 * this tests search with  0 args
 */
test("search no args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("search");
  await submitButton.click();

  await expect(
    page.getByText(
      "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
    )
  ).toBeVisible();
});

/**
 * this tests search with too many args
 */
test("search too many args", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("search <Header> <Item> <BOOO>");
  await submitButton.click();

  await expect(
    page.getByText(
      "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
    )
  ).toBeVisible();
});

// /**
//  * this tests failed search when no csv is loaded
//  */
// test("no csv search", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   await inputBox.fill("search <RI>");
//   await submitButton.click();

//   await expect(
//     page.getByText("Currently there is no CSV loaded.")
//   ).toBeVisible();
// });

/**
 * this tests successful search of full csv
 */
test("search success full csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <RI>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests successful search of full csv
 */
test("search success full csv different csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("search <51>");
  await submitButton.click();

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("51");
});

/**
 * this tests successful search of header
 */
test("search success header", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <State> <RI>");
  await submitButton.click();

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests successful search of index
 */
test("search success index", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <1> <White>");
  await submitButton.click();

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(0).locator("td").nth(1)).toHaveText("White");
});

/**
 * this tests search no item found in full csv
 */
test("search no item found in full csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <Unfound>");
  await submitButton.click();

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  await expect(
    page.getByText("Unfound was not found in the CSV.")
  ).toBeVisible();
});

/**
 * this tests search no item found in header
 */
test("search no item found in header", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <State> <Unfound>");
  await submitButton.click();

  await expect(
    page.getByText("Unfound was not found in column with header 'State'.")
  ).toBeVisible();
});

/**
 * this tests search no item found in index, but exists in csv
 */
test("search no item found in index, but exists in csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <1> <RI>");
  await submitButton.click();

  await expect(page.getByText("RI was not found in column 1.")).toBeVisible();

  await inputBox.fill("search <RI>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests search with header not existing
 */
test("search with header not existing", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("search <Header> <RI>");
  await submitButton.click();

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  await expect(
    page.getByText(
      "Header was not found. Headers are: [Height, Weight, Length, Width]. You requested Header"
    )
  ).toBeVisible();
});

/**
 * this tests search with index too big
 */
test("search with index too big", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("search <10> <RI>");
  await submitButton.click();

  await expect(
    page.getByText(
      "Parameter 'column', if index, was to big. CSV size is 4. You requested 10"
    )
  ).toBeVisible();
});

/**
 * this tests no item found after loading a new file, when it was in previous,
 * and success in new file loaded
 */
test("search success after loading new file, tests no result and success", async ({
  page,
}) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("view");
  await submitButton.click();

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("search <Height>");
  await submitButton.click();

  await expect(
    page.getByText("Height was not found in the CSV.")
  ).toBeVisible();

  await inputBox.fill("search <State> <RI>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(0)).toHaveText("RI");
});

/**
 * this tests successful search on a loaded file replacing a
 * previously loaded file, and after broadband
 */
test("search success after loading new file and broadband", async ({
  page,
}) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file <" + file2 + ">");
  await submitButton.click();

  await inputBox.fill("load_file <" + file1 + ">");
  await submitButton.click();

  await inputBox.fill("broadband <California> <Orange County>");
  await submitButton.click();

  await expect(page.getByText("93.0%")).toBeVisible();

  await inputBox.fill("search <State> <RI>");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("RI");
  await expect(resTable.nth(5).locator("td").nth(0)).toHaveText("RI");
});
