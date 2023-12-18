
import puppeteer from "puppeteer";
import express from "express"
import http from "http";

import dotenv from 'dotenv';
dotenv.config();

// TODO: Now it's your turn to improve the scraper and make him get more data from the Quotes to Scrape website.
// Here's a list of potential improvements you can make:
// - Navigate between all pages using the "Next" button and fetch the quotes on all the pages
// - Fetch the quote's tags (each quote has a list of tags)
// - Scrape the author's about page (by clicking on the author's name on each quote)
// - Categorize the quotes by tags or authors (it's not 100% related to the scraping itself, but that can be a good improvement)

// const app = express();


const port = process.env.PORT || 4000;


const scrapeResorts = async () => {
  const browser = await puppeteer.launch({ headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: process.env.NODE_ENV === "production"
    ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  const allResorts = [];

  for (let index = 0; index < 33; index++) {
    let link;

    if (index === 0) {
      link = "sorted/number-lifts/";
    } else {
      link = "page/" + index.toString() + "/sorted/number-lifts/";
    }

    try {
      await page.goto("https://www.skiresort.info/ski-resorts/" + link, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.error("TimeoutError: Navigation timed out");
        // Handle appropriately, e.g., by skipping this page
        continue;
      } else {
        throw error; // Re-throw other errors
      }
    

    const resorts = await page.evaluate(() => {
      const resortList = document.querySelectorAll(".panel.panel-default.resort-list-item.resort-list-item-image--big");

      return Array.from(resortList).map((resort) => {
        const name = resort.querySelector(".h3").innerText;
        if(resort.querySelector(".inline-dot") !== null){
          const lifts = resort.querySelector(".inline-dot").innerText;
          return { name, lifts };
        } else{
          const newLifts = "N/A";

          return {name, newLifts}
        }
      
      });
    });

    // Append the resorts from this page to the allResorts array
    allResorts.push(...resorts);

    // Click on the "Next page" button
    await page.waitForTimeout(1000);
  }

  await browser.close();

  return JSON.stringify(allResorts);
};

const server = http.createServer(async function (req, res) {
  try {
    const resorts = await scrapeResorts();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(resorts);
  } catch (error) {
    console.error("Error during scraping:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});