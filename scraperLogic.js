// // scraperLogic.js

const dataExtractionHandler = require('./dataExtractionHandler');

// async function scrapeData(page) {
//   const scrapedData = {};

//   // Extract and log the Country
//   const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
//   scrapedData.country = await dataExtractionHandler.extractTextFromXPath(page, countryHeadingXPath);

//   // Extract and log the Filing Requirements
//   const filingRequirementsXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[3]/span';

//   scrapedData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     filingRequirementsXPath,
//   );

//   const multipleClassOrDesignXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[2]/span';
//   scrapedData.multipleClassOrDesign = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     multipleClassOrDesignXPath,
//   );

//   const examinationInfoXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[6]/span';
//   scrapedData.examinationInfo = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     examinationInfoXPath,
//   );

//   const grantFeeValidityRenewalsXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]/span';
//   scrapedData.grantFeeValidityRenewalsXPath = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     grantFeeValidityRenewalsXPath,
//   );

//   const validityTermXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]/span';
//   scrapedData.validityTerm = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     validityTermXPath,
//   );

//   const useRequirementXPath =
//     '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]/span';
//   scrapedData.useRequirement = await dataExtractionHandler.extractTextFromXPath(
//     page,
//     useRequirementXPath,
//   );

//   return scrapedData;
// }

async function scrapeTrademarkData(page) {
  const scrapedTrademarkData = {};

  // Extract and log the Country
  const countryHeadingXPath = '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[1]';
  scrapedTrademarkData.country = await dataExtractionHandler.extractTextFromXPath(
    page,
    countryHeadingXPath,
  );

  // Extract and log the Filing Requirements
  const filingRequirementsXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[3]/span';

  scrapedTrademarkData.filingRequirements = await dataExtractionHandler.extractTextFromXPath(
    page,
    filingRequirementsXPath,
  );

  const multipleClassOrDesignXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[2]/span';
  scrapedTrademarkData.multipleClassOrDesign = await dataExtractionHandler.extractTextFromXPath(
    page,
    multipleClassOrDesignXPath,
  );

  const examinationInfoXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[6]/span';
  scrapedTrademarkData.examinationInfo = await dataExtractionHandler.extractTextFromXPath(
    page,
    examinationInfoXPath,
  );

  const grantFeeValidityRenewalsXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[7]/span';
  scrapedTrademarkData.grantFeeValidityRenewalsXPath =
    await dataExtractionHandler.extractTextFromXPath(page, grantFeeValidityRenewalsXPath);

  const validityTermXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[7]/span';
  scrapedTrademarkData.validityTerm = await dataExtractionHandler.extractTextFromXPath(
    page,
    validityTermXPath,
  );

  const useRequirementXPath =
    '/html/body/form/div[6]/div[3]/div/div/2/div[1]/div[1]/div/div[3]/p[9]/span';
  scrapedTrademarkData.useRequirement = await dataExtractionHandler.extractTextFromXPath(
    page,
    useRequirementXPath,
  );

  return scrapedTrademarkData;
}

async function scrapeIndustrialDesignData(page) {
  const scrapedIndustrialDesignData = {};
}

module.exports = {
  scrapeTrademarkData,
  scrapeIndustrialDesignData,
};
