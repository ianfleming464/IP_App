const dataExtractionHandler = require('./dataExtractionHandler');
/**
 * Scrapes industrial design data from a web page.
 * @param {Page} page - The Puppeteer page to scrape data from.
 * @param {string} selectedCountry - The selected country for scraping.
 * @param {object} selectedConfig - The selected country's configuration.
 * @returns {object} - The scraped industrial design data.
 */

async function scrapeIndustrialDesignData(page, selectedCountry, selectedConfig) {
  const scrapedIndustrialDesignData = {};

  // Default industrial design XPaths
  const defaultIndustrialDesignXPaths = {
    multipleDesigns: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]/span',
    filingRequirements:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]/span',
    examination: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]',
    noveltyGracePeriod: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]',
    grantValidityMaintenance:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]/span',
    durationRegistrationPeriod:
      '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[10]/span',
  };

  const industrialDesignXPaths = {
    ...defaultIndustrialDesignXPaths,
    ...(selectedConfig.specificIndustrialDesignXPaths || {}),
  }; // merging the default xpaths with the country-specific xpaths

  // extract multipleDesigns
  scrapedIndustrialDesignData.multipleDesigns = await dataExtractionHandler.extractTextFromXPath(
    page,
    industrialDesignXPaths.multipleDesigns,
  );

  // extract filingRequirements
  scrapedIndustrialDesignData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    industrialDesignXPaths.filingRequirements,
  );

  // extract examination
  scrapedIndustrialDesignData.examination = await dataExtractionHandler.extractTextFromXPath(
    page,
    industrialDesignXPaths.examination,
  );

  // extract noveltyGracePeriod
  scrapedIndustrialDesignData.noveltyGracePeriod = await dataExtractionHandler.extractTextFromXPath(
    page,
    industrialDesignXPaths.noveltyGracePeriod,
  );

  scrapedIndustrialDesignData.grantValidityMaintenance =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      industrialDesignXPaths.grantValidityMaintenance,
    );

  // extract durationRegistrationPeriod
  scrapedIndustrialDesignData.durationRegistrationPeriod =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      industrialDesignXPaths.durationRegistrationPeriod,
    );

  return scrapedIndustrialDesignData;
}

module.exports = {
  scrapeIndustrialDesignData,
};
