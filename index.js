const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.PROJECT_URL, process.env.SERVICE_KEY);

module.exports = {
  supabase,
};
