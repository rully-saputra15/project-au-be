const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SupabaseClient = createClient(
    process.env.SUPABASE_DOMAIN,
    process.env.SUPABASE_API_KEY
);

module.exports = SupabaseClient;
