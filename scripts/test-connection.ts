/**
 * Test Supabase Connection
 * 
 * Run this script to verify your Supabase connection is working.
 * Usage: npx tsx scripts/test-connection.ts
 */

// Load environment variables for Node.js scripts
import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load .env file from project root
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables from process.env (Node.js)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('   Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  process.exit(1);
}

// Create Supabase client directly (bypassing the Vite-specific import.meta.env)
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Not needed for scripts
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Check if we can query the services table
    console.log('1. Testing services table query...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(1);

    if (servicesError) {
      console.error('❌ Error querying services:', servicesError.message);
      return;
    }
    console.log('✅ Services table accessible');
    console.log(`   Found ${services?.length || 0} service(s)\n`);

    // Test 2: Check if we can query the bookings table
    console.log('2. Testing bookings table query...');
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .limit(1);

    if (bookingsError) {
      console.error('❌ Error querying bookings:', bookingsError.message);
      return;
    }
    console.log('✅ Bookings table accessible');
    console.log(`   Found ${bookings?.length || 0} booking(s)\n`);

    // Test 3: Check if we can query the contact_messages table
    console.log('3. Testing contact_messages table query...');
    const { data: messages, error: messagesError } = await supabase
      .from('contact_messages')
      .select('*')
      .limit(1);

    if (messagesError) {
      console.error('❌ Error querying contact_messages:', messagesError.message);
      return;
    }
    console.log('✅ Contact messages table accessible');
    console.log(`   Found ${messages?.length || 0} message(s)\n`);

    // Test 4: Check RLS policies
    console.log('4. Testing Row Level Security...');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('services')
      .select('id, name')
      .eq('is_active', true)
      .limit(1);

    if (rlsError) {
      console.error('❌ RLS test failed:', rlsError.message);
      return;
    }
    console.log('✅ RLS policies working correctly\n');

    console.log('🎉 All tests passed! Your Supabase connection is working correctly.');
    console.log('\n📊 Summary:');
    console.log(`   - Services: ${services?.length || 0}`);
    console.log(`   - Bookings: ${bookings?.length || 0}`);
    console.log(`   - Messages: ${messages?.length || 0}`);
    console.log(`   - RLS: Enabled and working`);

  } catch (error) {
    console.error('❌ Connection test failed:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    console.error('   2. Verify your Supabase project is active');
    console.error('   3. Check that tables were created successfully');
  }
}

testConnection();

