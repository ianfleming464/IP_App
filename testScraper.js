const puppeteer = require('puppeteer');
const configHandler = require('./configHandler');
const scraperLogicTrademark = require('./scraperLogicTrademark');

(async () => {
  const browser = await puppeteer.launch();

  for (const countryData of configHandler.countries) {
    const selectedConfig = configHandler.findCountryConfig(countryData.name);

    if (!selectedConfig) {
      console.log('Selected country not found in the configuration.');
      continue;
    }

    const page = await browser.newPage();

    try {
      await page.goto(selectedConfig.trademarkUrl); // Assuming you want to scrape trademark data
      await page.waitForTimeout(2000); // Add a delay of 2 seconds to ensure the page loads

      const scrapedTrademarkData = await scraperLogicTrademark.scrapeTrademarkData(
        page,
        countryData.name,
        selectedConfig,
      );

      console.log(`Scraping succeeded for ${countryData.name} - IP Type: trademark`);
      console.log('Scraped Data:', scrapedTrademarkData);
    } catch (error) {
      console.error(`Error while scraping ${countryData.name} - IP Type: trademark:`, error);
    } finally {
      await page.close();
    }

    // Add a delay between requests to avoid overloading the server
    await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
  }

  await browser.close();
})();
