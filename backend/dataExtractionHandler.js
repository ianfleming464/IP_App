async function extractTextFromXPath(page, xpath) {
  const element = await page.$x(xpath);
  return element.length > 0 ? await page.evaluate(e => e.textContent, element[0]) : 'Not found';
}

module.exports = {
  extractTextFromXPath,
};
