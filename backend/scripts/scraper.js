const puppeteer = require('puppeteer');
const configHandler = require('../configHandler');
const scraperLogicTrademark = require('../scraperLogicTrademark');
const scraperLogicIndustrialDesign = require('../scraperLogicIndustrialDesign');

async function scraper(supabase) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Fetch all countries from configHandler
  const countries = configHandler.countries;

  for (const countryData of countries) {
    const selectedConfig = configHandler.findCountryConfig(countryData.name);

    if (!selectedConfig) {
      console.log(`Selected country ${countryData.name} not found in the configuration.`);
      continue;
    }

    for (const selectedIPType of ['industrial design', 'trademark']) {
      // Navigate to the selected URL
      console.log(
        'Navigating to URL: ',
        selectedIPType === 'trademark'
          ? selectedConfig.trademarkUrl
          : selectedConfig.industrialDesignUrl,
      );

      await page.goto(
        selectedIPType === 'trademark'
          ? selectedConfig.trademarkUrl
          : selectedConfig.industrialDesignUrl,
      );

      try {
        if (selectedIPType === 'industrial design') {
          console.log('Scraping industrial design data for country: ', countryData.name);
          const scrapedDesignData = await scraperLogicIndustrialDesign.scrapeIndustrialDesignData(
            page,
            countryData.name,
            selectedConfig,
          );
          // DESIGN LOGIC **********************************************************************************************************************
          // Add scraped design data to the database
          const { error: designError, data: designData } = await supabase
            .from('industrial-design-info')
            .upsert(
              [
                {
                  country: countryData.name,
                  multiple_designs_available: scrapedDesignData.multipleDesigns,
                  filing_requirements: scrapedDesignData.filingRequirements,
                  examination: scrapedDesignData.examination,
                  novelty_grace_period: scrapedDesignData.noveltyGracePeriod,
                  grant_validity_maintenance: scrapedDesignData.grantValidityMaintenance,
                  duration_registration_period: scrapedDesignData.durationRegistrationPeriod,
                  last_time_scraped: new Date(),
                },
              ],
              { onConflict: ['country'] },
            );

          // Log the scraped design data
          console.log('Country: ', countryData.name);
          console.log('Multiple Designs: ', scrapedDesignData.multipleDesigns.trim());
          console.log('Filing Requirements: ', scrapedDesignData.filingRequirements.trim());
          console.log('Examination: ', scrapedDesignData.examination.trim());
          console.log('Novelty Grace Period: ', scrapedDesignData.noveltyGracePeriod.trim());
          console.log(
            'Grant Validity Maintenance: ',
            scrapedDesignData.grantValidityMaintenance.trim(),
          );
          countryData.name === 'Switzerland'
            ? console.log('Duration of the registration period: Not applicable')
            : console.log(
                'Duration of the registration period: ',
                scrapedDesignData.durationRegistrationPeriod.trim(),
              );
          if (designError) {
            throw designError;
          }
        } else {
          // TRADEMARK LOGIC *******************************************************************************************************************
          const scrapedTrademarkData = await scraperLogicTrademark.scrapeTrademarkData(
            page,
            countryData.name,
            selectedConfig,
          );

          // Add scraped trademark data to the database
          const { error: trademarkError, data: trademarkData } = await supabase
            .from('trademark-info')
            .upsert(
              [
                {
                  country: countryData.name,
                  multiple_class_available: scrapedTrademarkData.multipleClass,
                  filing_requirements: scrapedTrademarkData.filingRequirements,
                  examination_publication_opposition:
                    scrapedTrademarkData.examinationPublicationOpposition,
                  grant_validity_renewal: scrapedTrademarkData.grantValidityRenewal,
                  use_requirement: scrapedTrademarkData.useRequirement,
                  duration_registration_period:
                    countryData.name === 'Switzerland'
                      ? 'Not applicable'
                      : scrapedTrademarkData.durationRegistrationPeriod,
                  last_time_scraped: new Date(),
                },
              ],
              { onConflict: ['country'] },
            );

          if (trademarkError) {
            throw trademarkError;
          }

          // Log the scraped trademark data
          console.log('Country: ', countryData.name);
          console.log('Multiple Class: ', scrapedTrademarkData.multipleClass.trim());
          console.log('Filing Requirements: ', scrapedTrademarkData.filingRequirements.trim());
          console.log(
            'Examination/Publication/Opposition Info: ',
            scrapedTrademarkData.examinationPublicationOpposition.trim(),
          );
          console.log(
            'Grant/Validity/Renewal Info: ',
            scrapedTrademarkData.grantValidityRenewal.trim(),
          );
          console.log('Use Requirement: ', scrapedTrademarkData.useRequirement.trim());
          countryData.name === 'Switzerland'
            ? console.log('Duration of the registration period: Not applicable')
            : console.log(
                'Duration of the registration period: ',
                scrapedTrademarkData.durationRegistrationPeriod.trim(),
              );
        }
      } catch (error) {
        console.error(
          `Error while scraping ${countryData.name} - IP Type: ${selectedIPType}: `,
          error,
        );
      }
    }
  }

  await browser.close();
}

module.exports = scraper;
