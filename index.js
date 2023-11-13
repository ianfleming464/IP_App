const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const scraper = require('./scripts/scraper');

require('dotenv').config();

const app = express();
const port = 3000;

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.PROJECT_URL, process.env.SERVICE_KEY);

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

module.exports = {
  supabase,
};
