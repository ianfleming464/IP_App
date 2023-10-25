const { supabase } = require('../index');
const puppeteer = require('puppeteer');
const countries = require('../config/countries');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Specify the country and IP type to scrape - HARD CODED FOR TESTING PURPOSES. These will come from user input in the final version.
  const selectedCountry = 'USA'; // target country
  const selectedIPType = 'design'; // design or trademark

  // Find the selected country's configuration
  const selectedConfig = countries.find(country => country.name === selectedCountry);

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
  const countryHeadingXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/section[1]/div[1]/div[1]/h1';
  const countryElement = await page.$x(countryHeadingXPath);
  let country = 'Country not found'; // Default value in case the heading is not found

  if (countryElement.length > 0) {
    country = await page.evaluate(element => element.textContent, countryElement[0]);
  }

  console.log('Country:', country);

  // Extract and log the Filing Requirements
  const filingRequirementsXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]';
  const filingRequirementsElement = await page.$x(filingRequirementsXPath);
  let filingRequirements = 'Filing Requirements not found'; // Default value

  if (filingRequirementsElement.length > 0) {
    filingRequirements = await page.evaluate(
      element => element.textContent,
      filingRequirementsElement[0],
    );
  }

  console.log('Filing Requirements:', filingRequirements);

  // Close the browser
  await browser.close();
})();
