const puppeteer = require('puppeteer');

async function launchBrowser() {
  return await puppeteer.launch({ headless: new });
}

async function openNewPage(browser) {
  return await browser.newPage();
}

async function navigateToUrl(page, url) {
  await page.goto(url);
}

module.exports = {
  launchBrowser,
  openNewPage,
  navigateToUrl,
};
