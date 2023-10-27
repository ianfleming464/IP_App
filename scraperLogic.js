// scraperLogic.js

const dataExtractionHandler = require('./dataExtractionHandler');

async function scrapeData(page) {
  const scrapedData = {};

  // Extract and log the Country
  const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
  scrapedData.country = await dataExtractionHandler.extractTextFromXPath(page, countryHeadingXPath);

  // Extract and log the Filing Requirements
  const filingRequirementsXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]';
  scrapedData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    filingRequirementsXPath,
  );

  const multipleClassXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]';
  scrapedData.multipleClass = await dataExtractionHandler.extractTextFromXPath(
    page,
    multipleClassXPath,
  );

  const examinationInfoXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
  scrapedData.examinationInfo = await dataExtractionHandler.extractTextFromXPath(
    page,
    examinationInfoXPath,
  );

  const grantFeeXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
  scrapedData.grantFee = await dataExtractionHandler.extractTextFromXPath(page, grantFeeXPath);

  const validityTermXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]';
  scrapedData.validityTerm = await dataExtractionHandler.extractTextFromXPath(
    page,
    validityTermXPath,
  );

  const useRequirementXPath =
    '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]';
  scrapedData.useRequirement = await dataExtractionHandler.extractTextFromXPath(
    page,
    useRequirementXPath,
  );

  return scrapedData;
}

module.exports = {
  scrapeData,
};
