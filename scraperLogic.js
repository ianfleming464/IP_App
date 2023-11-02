const dataExtractionHandler = require('./dataExtractionHandler');

async function scrapeTrademarkData(page, selectedCountry, selectedConfig) {
  const scrapedTrademarkData = {};

  // defining the default trademark xpaths
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

  const trademarkXPaths = { ...defaultTrademarkXPaths, ...(selectedConfig.xPaths || {}) }; // merge the default xpaths with the country specific xpaths

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

async function scrapeIndustrialDesignData(page, selectedCountry, selectedConfig) {
  const scrapedIndustrialDesignData = {};

  // Define the default industrial design XPaths
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
  scrapeTrademarkData,
  scrapeIndustrialDesignData,
};
