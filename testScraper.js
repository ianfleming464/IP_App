const puppeteer = require('puppeteer');
const configHandler = require('./configHandler');
const scraperLogicTrademark = require('./scraperLogicTrademark');
const scraperLogicIndustrialDesign = require('./scraperLogicIndustrialDesign');

// Function to run trademark tests
async function runTrademarkTests() {
  const browser = await puppeteer.launch();

  for (const countryData of configHandler.countries) {
    const selectedConfig = configHandler.findCountryConfig(countryData.name);

    if (!selectedConfig) {
      console.log('Selected country not found in the configuration.');
      continue;
    }

    const page = await browser.newPage();

    try {
      await page.goto(selectedConfig.trademarkUrl);
      await page.waitForTimeout(2000);

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
}

// Function to run industrial design tests
async function runIndustrialDesignTests() {
  const browser = await puppeteer.launch();

  for (const countryData of configHandler.countries) {
    const selectedConfig = configHandler.findCountryConfig(countryData.name);

    if (!selectedConfig) {
      console.log('Selected country not found in the configuration.');
      continue;
    }

    const page = await browser.newPage();

    try {
      await page.goto(selectedConfig.industrialDesignUrl);
      await page.waitForTimeout(2000);

      const scrapedIndustrialDesignData =
        await scraperLogicIndustrialDesign.scrapeIndustrialDesignData(
          page,
          countryData.name,
          selectedConfig,
        );

      console.log(`Scraping succeeded for ${countryData.name} - IP Type: industrial design`);
      console.log('Scraped Data:', scrapedIndustrialDesignData);
    } catch (error) {
      console.error(
        `Error while scraping ${countryData.name} - IP Type: industrial design:`,
        error,
      );
    } finally {
      await page.close();
    }

    // Add a delay between requests to avoid overloading the server
    await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
  }

  await browser.close();
}

// Run trademark tests first
runTrademarkTests().then(() => {
  // After trademark tests are done, run industrial design tests
  runIndustrialDesignTests();
});
