const dataExtractionHandler = require('./dataExtractionHandler');

async function scrapeTrademarkData(page) {
  const scrapedTrademarkData = {};

  // Extract the Country name
  const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
  scrapedTrademarkData.country = await dataExtractionHandler.extractTextFromXPath(
    page,
    countryHeadingXPath,
  );

  // Extract the Multiple Class info
  const multipleClassXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]';
  scrapedTrademarkData.multipleClass = await dataExtractionHandler.extractTextFromXPath(
    page,
    multipleClassXPath,
  );

  // Extract the Filing Requirements
  const filingRequirementsXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]/span';
  scrapedTrademarkData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    filingRequirementsXPath,
  );

  // Extract the Examination/Publication/Opposition info
  const examinationPublicationOppositionXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]/span';
  scrapedTrademarkData.examinationPublicationOpposition =
    await dataExtractionHandler.extractTextFromXPath(page, examinationPublicationOppositionXPath);

  // Extract the Grant/Validity/Renewal info
  const grantValidityRenewalXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]';
  scrapedTrademarkData.grantValidityRenewal = await dataExtractionHandler.extractTextFromXPath(
    page,
    grantValidityRenewalXPath,
  );

  // Extract the Use Requirement info
  const useRequirementXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]/span';
  scrapedTrademarkData.useRequirement = await dataExtractionHandler.extractTextFromXPath(
    page,
    useRequirementXPath,
  );

  // Extract the Duration of Registration Period info
  const durationRegistrationPeriodXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]';
  scrapedTrademarkData.durationRegistrationPeriod =
    await dataExtractionHandler.extractTextFromXPath(page, durationRegistrationPeriodXPath);

  return scrapedTrademarkData;
}

module.exports = {
  scrapeTrademarkData,
};
