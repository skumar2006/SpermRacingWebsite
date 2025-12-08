import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ursednawrhhppjpocdau.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyc2VkbmF3cmhocHBqcG9jZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDg1MDIsImV4cCI6MjA3MDcyNDUwMn0.A1N0olLjpDs-d92Q6wB43-LzpmOVYeDMoBEO_vVVjnc'
);

export default supabase;
