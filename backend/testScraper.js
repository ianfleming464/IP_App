const puppeteer = require('puppeteer');
const configHandler = require('./configHandler');
const scraperLogicTrademark = require('./scraperLogicTrademark');
const scraperLogicIndustrialDesign = require('./scraperLogicIndustrialDesign');

async function testScraper() {
  const browser = await puppeteer.launch();

  for (const countryData of configHandler.countries) {
    const selectedConfig = configHandler.findCountryConfig(countryData.name);

    if (!selectedConfig) {
      console.log('Selected country not found in the configuration.');
      continue;
    }

    const page = await browser.newPage();

    try {
      for (const selectedIPType of ['industrial design', 'trademark']) {
        // Navigate to the selected URL
        console.log(
          'Navigating to URL: ',
          selectedIPType === 'trademark'
            ? selectedConfig.trademarkUrl
            : selectedConfig.industrialDesignUrl,
        );

        await page.goto(
          selectedIPType === 'trademark'
            ? selectedConfig.trademarkUrl
            : selectedConfig.industrialDesignUrl,
        );

        if (selectedIPType === 'industrial design') {
          console.log('Testing industrial design data for country: ', countryData.name);
          const scrapedDesignData = await scraperLogicIndustrialDesign.scrapeIndustrialDesignData(
            page,
            countryData.name,
            selectedConfig,
          );

          console.log(`Test succeeded for ${countryData.name} - IP Type: industrial design`);
          console.log('Scraped Data:', scrapedDesignData);
        } else {
          console.log('Testing trademark data for country: ', countryData.name);
          const scrapedTrademarkData = await scraperLogicTrademark.scrapeTrademarkData(
            page,
            countryData.name,
            selectedConfig,
          );

          console.log(`Test succeeded for ${countryData.name} - IP Type: trademark`);
          console.log('Scraped Data:', scrapedTrademarkData);
        }
      }
    } catch (error) {
      console.error(`Error during test scraping for ${countryData.name}:`, error);
    } finally {
      await page.close();
    }

    // Add a delay between requests to avoid overloading the server
    await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
  }

  await browser.close();
}

module.exports = testScraper;
