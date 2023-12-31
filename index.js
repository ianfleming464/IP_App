const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const scraper = require('./scripts/scraper');
const testScraper = require('./testScraper');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 3000;

// Create a write stream (in append mode) for Morgan to log to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use Morgan for logging HTTP requests to the console and a file
app.use(morgan('combined', { stream: accessLogStream }));

// Create a single Supabase client for interacting with your database
const supabase = createClient(process.env.PROJECT_URL, process.env.SERVICE_KEY);

// Define route for scraping
app.get('/scrape', async (req, res) => {
  try {
    await scraper(supabase); // Pass supabase as an argument to the scraper function
    res.status(200).send('Scraping completed successfully!');
  } catch (error) {
    console.error('Error while scraping:', error);
    res.status(500).send('Internal server error');
  }
});

// Define route for testing scraping without saving to the database
app.get('/test', async (req, res) => {
  try {
    // Execute the testScraper function
    await testScraper();

    res.status(200).send('Test scraping completed successfully!');
  } catch (error) {
    console.error('Error during test scraping:', error);
    res.status(500).send('Internal server error during test scraping');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { supabase }; // Export supabase for potential future use
