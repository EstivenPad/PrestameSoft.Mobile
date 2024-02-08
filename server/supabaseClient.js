import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://fosgbfskkrffgtmzahvn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvc2diZnNra3JmZmd0bXphaHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzQwNDQsImV4cCI6MjAyMTYxMDA0NH0.AsceTa8K4tibp0x__tRZbBp419axFBtBwMhntZZqgnM', {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
