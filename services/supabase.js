import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SupabaseClient = createClient(
  process.env.SUPABASE_DOMAIN,
  process.env.SUPABASE_API_KEY
);

export default SupabaseClient;
