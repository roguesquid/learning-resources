import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://rruztpzzetxzrmuweotb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydXp0cHp6ZXR4enJtdXdlb3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMjk4MTYsImV4cCI6MjAxNDcwNTgxNn0.7XF1mEUaN9kh_XHWMc8d_RMENKdDw8YauxFJTIJIwl0',
);
