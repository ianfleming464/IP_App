const puppeteer = require('puppeteer');
const configHandler = require('../configHandler');
const scraperLogic = require('../scraperLogic');
const { supabase } = require('../index');

async function scraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
  const selectedCountry = 'Switzerland'; // target country
  const selectedIPType = 'trademark'; // design or trademark

  // Use the configHandler to find the selected country's configuration
  const selectedConfig = configHandler.findCountryConfig(selectedCountry);

  if (!selectedConfig) {
    console.log('Selected country not found in the configuration.');
    await browser.close();
    return;
  }

  // Navigate to the selected URL
  await page.goto(
    selectedIPType === 'trademark'
      ? selectedConfig.trademarkUrl
      : selectedConfig.industrialDesignUrl,
  );

  try {
    const scrapedTrademarkData = await scraperLogic.scrapeTrademarkData(
      page,
      selectedCountry,
      selectedConfig,
    );

    // Log the scraped data

    console.log('Country: ', selectedCountry);
    console.log('Multiple Class: ', scrapedTrademarkData.multipleClass.trim());
    console.log('Filing Requirements: ', scrapedTrademarkData.filingRequirements.trim());
    console.log(
      'Examination/Publication/Opposition Info: ',
      scrapedTrademarkData.examinationPublicationOpposition.trim(),
    );
    console.log('Grant/Validity/Renewal Info: ', scrapedTrademarkData.grantValidityRenewal.trim());
    console.log('Use Requirement: ', scrapedTrademarkData.useRequirement.trim());
    selectedCountry === 'Switzerland'
      ? console.log('Use Requirement: Not applicable')
      : console.log(
          'Duration of the registration period: ',
          scrapedTrademarkData.durationRegistrationPeriod.trim(),
        );
  } catch (error) {
    console.error('Error while scraping: ', error);
  } finally {
    await browser.close();
  }
}

scraper();
