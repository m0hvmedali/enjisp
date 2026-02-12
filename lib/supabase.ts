import { createClient } from '@supabase/supabase-js';

// These variables are used for connecting to the database.
// Fallback values are provided to ensure the app works out-of-the-box on deployment.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pawwqdaiucbvohsgmtop.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3dxZGFpdWNidm9oc2dtdG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTQ5MDgsImV4cCI6MjA3ODc5MDkwOH0.EuNNd8Cj9TBxJvmPARhhR1J1KPwoS3X46msX-MhriRk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
