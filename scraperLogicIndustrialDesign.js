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
    ...(selectedConfig.xPaths || {}),
  }; // merging the default xpaths with the country-specific xpaths

  // Extract data using default XPaths
  scrapedIndustrialDesignData.multipleDesigns = await dataExtractionHandler.extractTextFromXPath(
    page,
    defaultIndustrialDesignXPaths.multipleDesigns,
  );

  scrapedIndustrialDesignData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    defaultIndustrialDesignXPaths.filingRequirements,
  );

  scrapedIndustrialDesignData.examination = await dataExtractionHandler.extractTextFromXPath(
    page,
    defaultIndustrialDesignXPaths.examination,
  );

  scrapedIndustrialDesignData.noveltyGracePeriod = await dataExtractionHandler.extractTextFromXPath(
    page,
    defaultIndustrialDesignXPaths.noveltyGracePeriod,
  );

  scrapedIndustrialDesignData.grantValidityMaintenance =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      defaultIndustrialDesignXPaths.grantValidityMaintenance,
    );

  scrapedIndustrialDesignData.durationRegistrationPeriod =
    await dataExtractionHandler.extractTextFromXPath(
      page,
      defaultIndustrialDesignXPaths.durationRegistrationPeriod,
    );

  return scrapedIndustrialDesignData;
}

module.exports = {
  scrapeIndustrialDesignData,
};
