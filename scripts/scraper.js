const puppeteer = require('puppeteer');
const configHandler = require('../configHandler'); // Import the configHandler module
const scraperLogic = require('../scraperLogic'); // Import your scraping logic
const { supabase } = require('../index');

async function scraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
  const selectedCountry = 'China'; // target country
  const selectedIPType = 'design'; // design or trademark

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
    // Use the scraperLogic to scrape data
    const scrapedData = await scraperLogic.scrapeData(page);

    const { error } = await supabase.from('ip-info').insert({
      country: scrapedData.country,
      // validity_term: scrapedData.validityTerm,
      filing_requirements: scrapedData.filingRequirements,
      // examination_info: scrapedData.examinationInfo,
      // grant_fee: scrapedData.grantFee,
      use_requirement: scrapedData.useRequirement,
      multiple_available: scrapedData.multipleClass,
      // 'last_time_scraped':
    });
    console.log(error);
    if (error) {
      throw error;
    }
    // Log the scraped data

    console.log('Country:', scrapedData.country);
    console.log('Filing Requirements:', scrapedData.filingRequirements);
    console.log('Multiple Class:', scrapedData.multipleClass);
    console.log('Examination Info:', scrapedData.examinationInfo);
    console.log('Grant Fee:', scrapedData.grantFee);
    console.log('Validity Term:', scrapedData.validityTerm);
    console.log('Use Requirement:', scrapedData.useRequirement);
  } catch (error) {
    console.error('Error while scraping:', error);
  }

  // Close the browser
  await browser.close();
}

scraper();
