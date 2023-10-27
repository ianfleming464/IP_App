const puppeteer = require('puppeteer');
const configHandler = require('../configHandler'); // Import the configHandler module
const dataExtractionHandler = require('../dataExtractionHandler'); // Import the dataExtractionHandler module

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
  const selectedCountry = 'USA'; // target country
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

  // Extract and log the Country

  // Extract and log the Country using the dataExtractionHandler
  const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
  const country = await dataExtractionHandler.extractTextFromXPath(page, countryHeadingXPath);
  console.log('Country:', country);

  // Extract and log the Filing Requirements
  // Extract and log the Filing Requirements using the dataExtractionHandler
  const filingRequirementsXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]';
  const filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    filingRequirementsXPath,
  );
  console.log('Filing Requirements:', filingRequirements);

  // Close the browser
  await browser.close();
})();
