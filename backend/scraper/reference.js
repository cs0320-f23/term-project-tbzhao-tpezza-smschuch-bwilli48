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
    const allResorts = [];
  
    // On this new page:
    // - wait until the dom content is loaded (HTML is ready)
   // for (let index = 0; index < 33; index++) {
      for (let index = 0; index < 3; index++) {
      if(index == 0){
          let link = "sorted/number-lifts/";
          await page.goto("https://www.skiresort.info/ski-resorts/" + link , {
      waitUntil: "domcontentloaded",
    });
  
      } else{
          let link = "page/" + index.toString() + "/sorted/number-lifts/";
          await page.goto("https://www.skiresort.info/ski-resorts/" + link , {
      waitUntil: "domcontentloaded",
    });
  
      }
  
  
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
        
        return {name, lifts};
      });
    });
  
    // Display the quotes
    //console.log(resorts);
    allResorts.push(...resorts);
  
    // Click on the "Next page" button
    await page.waitForTimeout(500);
      }
      console.log(allResorts);
  }
    // Close the browser
    //await browser.close();
  //};
  
  // Start the scraping
      var json = JSON.stringify(getResorts());