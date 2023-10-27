const puppeteer = require('puppeteer');
const configHandler = require('./configHandler');
const scraperLogic = require('./scraperLogic');

(async () => {
  const browser = await puppeteer.launch();

  for (const countryData of configHandler.countries) {
    for (const ipType of ['trademark', 'design']) {
      const selectedConfig = configHandler.findCountryConfig(countryData.name);

      if (!selectedConfig) {
        console.log('Selected country not found in the configuration.');
        continue;
      }

      const page = await browser.newPage();
      await page.goto(
        ipType === 'trademark' ? selectedConfig.trademarkUrl : selectedConfig.industrialDesignUrl,
      );

      try {
        const scrapedData = await scraperLogic.scrapeData(page);
        if (scrapedData.country && scrapedData.filingRequirements) {
          console.log(`Scraping succeeded for ${countryData.name} - IP Type: ${ipType}`);
          console.log('Scraped Data:', scrapedData);
        } else {
          console.log(`Scraping failed for ${countryData.name} - IP Type: ${ipType}`);
        }
      } catch (error) {
        console.error(`Error while scraping ${countryData.name} - IP Type: ${ipType}:`, error);
      }

      await page.close();
    }
  }

  await browser.close();
})();
