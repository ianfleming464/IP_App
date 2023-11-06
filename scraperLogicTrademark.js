const dataExtractionHandler = require('./dataExtractionHandler');

/**
 * Scrapes trademark data from a web page.
 * @param {Page} page - The Puppeteer page to scrape data from.
 * @param {string} selectedCountry - The selected country for scraping.
 * @param {object} selectedConfig - The selected country's configuration.
 * @returns {object} - The scraped trademark data.
 */

async function scrapeTrademarkData(page, selectedCountry, selectedConfig) {
  const scrapedTrademarkData = {};

  // Default trademark xpaths
  const defaultTrademarkXPaths = {
    multipleClass: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]/span',
    filingRequirements:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]/span',
    examinationPublicationOpposition:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]/span',
    grantValidityRenewal: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]',
    useRequirement: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]/span',
    durationRegistrationPeriod:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]',
  };

  const trademarkXPaths = { ...defaultTrademarkXPaths, ...(selectedConfig.xPaths || {}) }; // merging the default xpaths with the country-specific xpaths

  // extract multipleClass

  scrapedTrademarkData.multipleClass = await dataExtractionHandler.extractTextFromXPath(
    page,
    trademarkXPaths.multipleClass,
  );

  // extract filingRequirements

  scrapedTrademarkData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    trademarkXPaths.filingRequirements,
  );

  // extract examinationPublicationOpposition

  scrapedTrademarkData.examinationPublicationOpposition =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      trademarkXPaths.examinationPublicationOpposition,
    );

  // extract grantValidityRenewal

  scrapedTrademarkData.grantValidityRenewal = await dataExtractionHandler.extractTextFromXPath(
    page,
    trademarkXPaths.grantValidityRenewal,
  );

  // extract useRequirement

  scrapedTrademarkData.useRequirement = await dataExtractionHandler.extractTextFromXPath(
    page,
    trademarkXPaths.useRequirement,
  );

  // extract durationRegistrationPeriod

  scrapedTrademarkData.durationRegistrationPeriod =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      trademarkXPaths.durationRegistrationPeriod,
    );

  return scrapedTrademarkData;
}

module.exports = {
  scrapeTrademarkData,
};
