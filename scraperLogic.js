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

  // console.log('Selected Country:', selectedCountry);
  // console.log('Selected XPaths:', selectedConfig.xPaths);
  // console.log('Merged XPaths:', trademarkXPaths);

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

  // console.log('useRequirementXPath:', trademarkXPaths.useRequirement);

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
