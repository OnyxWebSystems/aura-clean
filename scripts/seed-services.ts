/**
 * Seed Services Data
 * 
 * This script populates the services table with initial data.
 * Usage: npx tsx scripts/seed-services.ts
 */

// Load environment variables for Node.js scripts
import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_SERVICES } from '../src/constants/services';

// Load .env file from project root
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables from process.env (Node.js)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use service_role key for seeding (bypasses RLS) - this is safe for server-side scripts only
// The service_role key allows bypassing RLS policies for administrative operations
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Missing VITE_SUPABASE_URL in your .env file.');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Missing VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.');
  console.error('\n💡 To fix this:');
  console.error('   1. Go to Supabase Dashboard → API Keys');
  console.error('   2. Copy your "Secret key" (starts with sb_secret_...)');
  console.error('   3. Add it to your .env file as: VITE_SUPABASE_SERVICE_ROLE_KEY=your_secret_key');
  console.error('\n⚠️  WARNING: The service_role key bypasses RLS and should ONLY be used in server-side scripts!');
  console.error('   NEVER use it in frontend code or commit it to git.');
  process.exit(1);
}

// Create Supabase client with service_role key to bypass RLS for seeding
// ⚠️ WARNING: Service role key should NEVER be used in frontend code!
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

async function seedServices() {
  console.log('🌱 Seeding services table...\n');

  try {
    // Check if services already exist
    const { data: existingServices, error: checkError } = await supabase
      .from('services')
      .select('slug');

    if (checkError) {
      console.error('❌ Error checking existing services:', checkError.message);
      return;
    }

    const existingSlugs = new Set(existingServices?.map((s) => s.slug) || []);

    // Prepare services data
    const servicesToInsert = DEFAULT_SERVICES.map((service) => ({
      name: service.name,
      slug: service.slug,
      description: service.description,
      long_description: service.long_description,
      included_items: service.included_items,
      duration_hours: service.duration_hours,
      base_price: service.base_price,
      icon: service.icon,
      image: service.image,
      is_active: true,
      display_order: DEFAULT_SERVICES.indexOf(service),
    }));

    // Filter out services that already exist
    const newServices = servicesToInsert.filter(
      (service) => !existingSlugs.has(service.slug)
    );

    if (newServices.length === 0) {
      console.log('✅ All services already exist in the database.');
      console.log(`   Found ${existingServices?.length || 0} existing service(s)\n`);
      return;
    }

    console.log(`📝 Inserting ${newServices.length} new service(s)...\n`);

    // Insert services
    const { data: insertedServices, error: insertError } = await supabase
      .from('services')
      .insert(newServices)
      .select();

    if (insertError) {
      console.error('❌ Error inserting services:', insertError.message);
      console.error('   Details:', insertError);
      return;
    }

    console.log('✅ Successfully seeded services!\n');
    console.log('📊 Inserted services:');
    insertedServices?.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.name} (${service.slug})`);
      console.log(`      Price: $${service.base_price}`);
      console.log(`      Duration: ${service.duration_hours} hours\n`);
    });

    if (existingServices && existingServices.length > 0) {
      console.log(`ℹ️  ${existingServices.length} service(s) were already in the database.`);
    }

    console.log('\n🎉 Seeding complete!');
    console.log(`   Total services in database: ${(existingServices?.length || 0) + (insertedServices?.length || 0)}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Ensure services table exists');
    console.error('   2. Check RLS policies allow inserts');
    console.error('   3. Verify your Supabase connection');
  }
}

seedServices();

