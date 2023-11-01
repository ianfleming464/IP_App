const puppeteer = require('puppeteer');
const configHandler = require('../configHandler'); // Import the configHandler module
const scraperLogic = require('../scraperLogic'); // Import your scraping logic
const { supabase } = require('../index');

async function scraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
  const selectedCountry = 'United Kingdom'; // target country
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
    // Use the scraperLogic to scrape data
    const scrapedTrademarkData = await scraperLogic.scrapeTrademarkData(page);

    // const { error } = await supabase.from('ip-info').insert({
    //   country: scrapedData.country,
    //   validity_term: scrapedData.validityTerm,
    //   filing_requirements: scrapedData.filingRequirements,
    //   examination_info: scrapedData.examinationInfo,
    //   grant_fee: scrapedData.grantFee,
    //   use_requirement: scrapedData.useRequirement,
    //   multiple_available: scrapedData.multipleClass,
    //   'last_time_scraped':
    // });
    // console.log(error);
    // if (error) {
    //   throw error;
    // }
    // Log the scraped data

    console.log('Country: ', scrapedTrademarkData.country);
    console.log('Multiple Class: ', scrapedTrademarkData.multipleClass);
    console.log('Filing Requirements: ', scrapedTrademarkData.filingRequirements);
    console.log(
      'Examination/Publication/Opposition Info: ',
      scrapedTrademarkData.examinationPublicationOpposition,
    );
    console.log('Grant/Validity/Renewal Info: ', scrapedTrademarkData.grantValidityRenewal);
    console.log('Use Requirement: ', scrapedTrademarkData.useRequirement);
    console.log(
      'Duration of the registration period: ',
      scrapedTrademarkData.durationRegistrationPeriod,
    );
  } catch (error) {
    console.error('Error while scraping: ', error);
  }

  // Close the browser
  await browser.close();
}

scraper();
