
import puppeteer from "puppeteer";
import express from "express"
import http from "http";

// TODO: Now it's your turn to improve the scraper and make him get more data from the Quotes to Scrape website.
// Here's a list of potential improvements you can make:
// - Navigate between all pages using the "Next" button and fetch the quotes on all the pages
// - Fetch the quote's tags (each quote has a list of tags)
// - Scrape the author's about page (by clicking on the author's name on each quote)
// - Categorize the quotes by tags or authors (it's not 100% related to the scraping itself, but that can be a good improvement)

// const app = express();


const port = process.env.port || 3000;

// Create HTTP server

// app.get("/scrape", async (req, res) => {
//   try {
//     const resorts = await scrapeResorts();
//     res.json(resorts);
//   } catch (error) {
//     console.error("Error during scraping:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



const scrapeResorts = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allResorts = [];

  for (let index = 0; index < 3; index++) {
    let link;

    if (index === 0) {
      link = "sorted/number-lifts/";
    } else {
      link = "page/" + index.toString() + "/sorted/number-lifts/";
    }

    await page.goto("https://www.skiresort.info/ski-resorts/" + link, {
      waitUntil: "domcontentloaded",
    });

    const resorts = await page.evaluate(() => {
      const resortList = document.querySelectorAll(".panel.panel-default.resort-list-item.resort-list-item-image--big");

      return Array.from(resortList).map((resort) => {
        const name = resort.querySelector(".h3").innerText;
        const lifts = resort.querySelector(".inline-dot").innerText;

        return { name, lifts };
      });
    });

    // Append the resorts from this page to the allResorts array
    allResorts.push(...resorts);

    // Click on the "Next page" button
    await page.waitForTimeout(500);
  }

  //await browser.close();

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