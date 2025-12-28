# Database Scripts

This directory contains utility scripts for testing and seeding your Supabase database.

## Available Scripts

### Test Connection

Test your Supabase connection and verify tables are accessible:

```bash
npm run test:supabase
```

Or directly:
```bash
npx tsx scripts/test-connection.ts
```

This script will:
- ✅ Test connection to services table
- ✅ Test connection to bookings table
- ✅ Test connection to contact_messages table
- ✅ Verify Row Level Security (RLS) is working

### Seed Services

Populate your services table with initial data from `src/constants/services.ts`:

```bash
npm run seed:services
```

Or directly:
```bash
npx tsx scripts/seed-services.ts
```

This script will:
- 🌱 Insert default services (Residential, Office, Deep Cleaning, Move-In/Out)
- 🔍 Skip services that already exist (safe to run multiple times)
- 📊 Show summary of inserted services

## Prerequisites

1. Make sure your `.env` file is configured with:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Ensure database tables are created (see `SUPABASE_SETUP.md`)

3. Install dependencies:
   ```bash
   npm install
   ```

## Troubleshooting

If scripts fail:
- Check your `.env` file has correct credentials
- Verify tables exist in Supabase dashboard
- Check RLS policies allow the operations
- Review error messages for specific issues

