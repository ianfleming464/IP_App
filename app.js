const express = require('express');
const scraper = require('./scripts/scraper');

const app = express();
const port = 3000;

// Define route for scraping
app.get('/scrape', async (req, res) => {
  try {
    await scraper();
    res.statue(200).send('Scraping completed successfully!');
  } catch (error) {
    console.error('Error while scraping:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
