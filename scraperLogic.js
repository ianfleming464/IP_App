const dataExtractionHandler = require('./dataExtractionHandler');

async function scrapeTrademarkData(page) {
  const scrapedTrademarkData = {};

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

// Functioning theoretically, but to do: I need to implement conditional Xpath statements to account for the different formats of the pages.
// check notebook for discrepancies in the test countries, and ChatGPT for the skeleton approach.
// Then, time to insert into the relevant TM table in Supabase, and move on to ID for the 5 test countries.
