const { supabase } = require('../index');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the target site
  await page.goto('https://www.ip-coster.com/IPGuides/trademark-china');

  // Extract Country from a specific heading using XPath
  const countryHeadingXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/section[1]/div[1]/div[1]/h1';
  const countryElement = await page.$x(countryHeadingXPath);

  let country = 'Country not found'; // Default value in case the heading is not found
  if (countryElement.length > 0) {
    country = await page.evaluate(element => element.textContent, countryElement[0]);
  }
  console.log('Country:', country);
  // Define the XPath expressions for the elements containing information
  const xPaths = {
    multipleClass: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]',
    filingRequirements: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]',
    examinationInfo: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]',
    grantFee: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]',
    validityTerm: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]',
    useRequirement: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]',
  };

  const info = {};
  for (const key in xPaths) {
    const elements = await page.$x(xPaths[key]);
    if (elements.length > 0) {
      info[key] = await page.evaluate(element => element.textContent, elements[0]);
      console.log(`${key}:`, info[key]);
    } else {
      console.log(`${key} not found.`);
    }
  }

  await browser.close();
})();
