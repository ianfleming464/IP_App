const countries = require('./config/countries');

function findCountryConfig(selectedCountry) {
  const selectedConfig = countries.find(country => country.name === selectedCountry);
  console.log('Selected Config:', selectedConfig);
  return selectedConfig;
}

module.exports = {
  countries,
  findCountryConfig,
};
