const countries = require('./config/countries');

function findCountryConfig(selectedCountry) {
  return countries.find(country => country.name === selectedCountry);
}

module.exports = {
  countries,
  findCountryConfig,
};
