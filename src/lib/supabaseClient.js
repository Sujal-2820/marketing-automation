import { createClient } from '@supabase/supabase-js'

// Fallback to hardcoded credentials if .env variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hyspvvzydtmzerkaxzke.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5c3B2dnp5ZHRtemVya2F4emtlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA5ODk1MywiZXhwIjoyMTAxNjc0OTUzfQ.FZ3GcfL3edtCHhNPWF9tQRAVCgwosYrke4cpEvMDRL0"

// Initialize the live Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
