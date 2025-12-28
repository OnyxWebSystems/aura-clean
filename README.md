# Aura Clean

A modern, full-stack web application for a professional cleaning service booking platform. Built with React, TypeScript, and Supabase, Aura Clean provides a seamless booking experience for customers and comprehensive management tools for administrators.

## Features

### Customer Features
- **Service Selection**: Browse and book from four service types:
  - Residential Cleaning
  - Office Cleaning
  - Deep Cleaning
  - Move-In/Out Cleaning
- **Interactive Booking Wizard**: Multi-step booking process with:
  - Service selection with detailed descriptions
  - Date and time scheduling with calendar interface
  - Customer details and address collection
  - Real-time pricing calculation
- **User Dashboard**: View and manage personal bookings
- **Account Management**: User authentication with password reset functionality
- **Contact Form**: Submit inquiries with email notifications

### Admin Features
- **Admin Dashboard**: Comprehensive management interface
  - Booking overview and statistics
  - Booking management (view, update status, add notes)
  - Contact message management
  - Email notifications for new bookings and messages
- **Booking Status Management**: Track bookings through their lifecycle (pending, confirmed, in progress, completed, cancelled)

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Query (TanStack Query)** - Data fetching and caching
- **date-fns** - Date utility library

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Authentication
  - Real-time subscriptions
- **Resend** - Email service for notifications

## Project Structure

```
aura-clean/
├── src/
│   ├── api/              # API clients
│   ├── components/       # React components
│   │   ├── admin/        # Admin-specific components
│   │   ├── booking/      # Booking flow components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── home/         # Home page components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── constants/        # Application constants
│   ├── lib/              # Library configurations and utilities
│   ├── pages/            # Page components
│   └── utils/            # Helper functions
├── scripts/              # Utility scripts
│   ├── seed-services.ts  # Database seeding script
│   └── test-connection.ts # Database connection test
├── dist/                 # Build output
└── testsprite_tests/     # Automated test suite
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- A Resend account (for email notifications)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Aura Clean"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RESEND_API_KEY=your_resend_api_key
```

4. Set up your Supabase database:
   - Create tables: `services`, `bookings`, `contact_messages`, `users`
   - Configure Row Level Security (RLS) policies
   - Set up authentication

5. Seed the database with default services:
```bash
npm run seed:services
```

6. Test the database connection:
```bash
npm run test:supabase
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test:supabase` - Test Supabase connection
- `npm run seed:services` - Seed database with default services

## Database Schema

The application uses the following main tables:

### `services`
Stores cleaning service definitions with pricing, descriptions, and metadata.

### `bookings`
Stores customer bookings with service details, customer information, scheduling, and status.

### `contact_messages`
Stores inquiries submitted through the contact form.

### `users`
User profiles linked to Supabase authentication.

## Authentication

The application uses Supabase Authentication with:
- Email/password authentication
- Password reset functionality
- Session persistence
- PKCE flow for enhanced security

## Email Notifications

Email notifications are sent via Resend for:
- New booking confirmations
- Booking status updates
- New contact form submissions

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` configuration file is included in the project.

For deployment:
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

## Testing

Automated tests are available in the `testsprite_tests/` directory, covering:
- Home page functionality
- Services page and filtering
- Booking wizard flow
- Authentication flows
- Dashboard features
- Admin functionality
- Contact form
- Responsive design
- Accessibility compliance

## License

Private project - All rights reserved

## Contributing

This is a private portfolio project. For questions or inquiries, please contact the project owner.

