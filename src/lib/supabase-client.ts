import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://yznmvrmfpuyfdnrhaadu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bm12cm1mcHV5ZmRucmhhYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5ODI2MTMsImV4cCI6MjAyMjU1ODYxM30.PKqHUvj-jLoHyhHZR8CV2IowfumkQP048W_VwDUdMns',
);
