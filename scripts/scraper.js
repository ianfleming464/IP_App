const puppeteer = require('puppeteer');
const configHandler = require('../configHandler'); // Import the configHandler module
const scraperLogic = require('../scraperLogic'); // Import your scraping logic

(async () => {
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
})();

// const puppeteer = require('puppeteer');
// const configHandler = require('../configHandler'); // Import the configHandler module
// const dataExtractionHandler = require('../dataExtractionHandler'); // Import the dataExtractionHandler module

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
//   const selectedCountry = 'China'; // target country
//   const selectedIPType = 'design'; // design or trademark

//   // Use the configHandler to find the selected country's configuration
//   const selectedConfig = configHandler.findCountryConfig(selectedCountry);

//   if (!selectedConfig) {
//     console.log('Selected country not found in the configuration.');
//     await browser.close();
//     return;
//   }

//   // Navigate to the selected URL
//   await page.goto(
//     selectedIPType === 'trademark'
//       ? selectedConfig.trademarkUrl
//       : selectedConfig.industrialDesignUrl,
//   );

//   // Extract and log the Country
//   const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
//   const country = await dataExtractionHandler.extractTextFromXPath(page, countryHeadingXPath);
//   console.log('Country:', country);

//   // Extract and log the Filing Requirements
//   const filingRequirementsXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]';
//   const filingRequirements = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     filingRequirementsXPath,
//   );
//   console.log('Filing Requirements:', filingRequirements);

//   const multipleClassXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]';
//   const multipleClass = await dataExtractionHandler.extractTextFromXPath(page, multipleClassXPath);
//   console.log('Multiple Class:', multipleClass);

//   const examinationInfoXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
//   const examinationInfo = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     examinationInfoXPath,
//   );
//   console.log('Examination Info:', examinationInfo);

//   const grantFeeXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
//   const grantFee = await dataExtractionHandler.extractTextFromXPath(page, grantFeeXPath);
//   console.log('Grant Fee:', grantFee);

//   const validityTermXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
//   const validityTerm = await dataExtractionHandler.extractTextFromXPath(page, validityTermXPath);
//   console.log('Validity Term:', validityTerm);

//   const useRequirementXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]';
//   const useRequirement = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     useRequirementXPath,
//   );
//   console.log('Use Requirement:', useRequirement);

//   // Close the browser
//   await browser.close();
// })();
