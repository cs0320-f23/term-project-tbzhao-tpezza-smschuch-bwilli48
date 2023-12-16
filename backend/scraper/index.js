import puppeteer from "puppeteer";

// TODO: Now it's your turn to improve the scraper and make him get more data from the Quotes to Scrape website.
// Here's a list of potential improvements you can make:
// - Navigate between all pages using the "Next" button and fetch the quotes on all the pages
// - Fetch the quote's tags (each quote has a list of tags)
// - Scrape the author's about page (by clicking on the author's name on each quote)
// - Categorize the quotes by tags or authors (it's not 100% related to the scraping itself, but that can be a good improvement)

const getResorts = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.skiresort.info/ski-resorts/sorted/number-lifts/", {
    waitUntil: "domcontentloaded",
  });

 // while( page.evaluate(() => {
  //  document.querySelector(".pager > .next > a")}
   // )){

  // Get page data
  const resorts = await page.evaluate(() => {
        // Get the displayed text and returns it
    const resortList = document.querySelectorAll(".panel.panel-default.resort-list-item.resort-list-item-image--big");
    console.log(resortList);
    

    return Array.from(resortList).map((resort) => {
      const name = resort.querySelector(".h3").innerText;
      console.log(name);
      const lifts = resort.querySelector(".inline-dot").innerText;
      console.log(lifts);

      return { name, lifts };
    });
  });

  // Display the quotes
  console.log(resorts);

  // Click on the "Next page" button
  await page.click(".pagination.pull-right > .li > a ");
  await page.waitForTimeout(1000);
}
  // Close the browser
  //await browser.close();
//};

// Start the scraping
getResorts();