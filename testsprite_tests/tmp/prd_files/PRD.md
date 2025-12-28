# Product Requirements Document (PRD)
## Aura Clean - Premium Cleaning Services Platform

### 1. Project Overview
Aura Clean (Pristine & Co.) is a premium full-stack React application for a cleaning services company. The platform allows customers to browse services, book cleaning appointments, manage their bookings, and contact the company. Administrators can manage bookings, view contact messages, and update booking statuses.

### 2. Technical Stack
- **Frontend**: React 18.2.0 with TypeScript 5.2.2
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.4.0
- **Routing**: React Router DOM 6.21.0
- **State Management**: React Query (@tanstack/react-query 5.17.0)
- **Animations**: Framer Motion 10.16.16
- **Backend**: Supabase (Database & Authentication)
- **Email Service**: Resend 2.1.0
- **Icons**: Lucide React 0.303.0
- **Date Handling**: date-fns 3.0.0

### 3. User Requirements

#### 3.1 Public User Requirements

**REQ-1: Home Page Navigation**
- Users must be able to view the home page with hero section
- Users must be able to see service overview cards
- Users must be able to view "How It Works" section
- Users must be able to see trust indicators and testimonials
- Users must be able to click CTA buttons to navigate to booking or contact pages
- Users must be able to navigate to all main pages via navigation bar

**REQ-2: Services Browsing**
- Users must be able to view all available cleaning services
- Users must be able to see service details including pricing, duration, and included items
- Users must be able to click "Book This Service" button to start booking process
- Services must be fetched from Supabase database
- Services must display with images, descriptions, and pricing information

**REQ-3: Booking Flow**
- Users must be able to select a cleaning service
- Users must be able to select a date using calendar component
- Users must be able to select a time slot
- Users must be able to fill in customer details (name, email, phone, address, property size)
- Users must be able to review booking details before confirmation
- System must calculate price based on service base price and property size
- Users must be authenticated to complete booking
- System must send booking confirmation email via Resend
- Booking must be saved to Supabase database

**REQ-4: Contact Form**
- Users must be able to submit contact messages
- Form must include fields: name, email, phone, subject, message
- Form must have validation
- System must save contact messages to Supabase
- System must send confirmation email to user
- System must send notification email to admin

**REQ-5: About Page**
- Users must be able to view company information
- Users must be able to see company mission and values
- Users must be able to view company timeline/milestones
- Users must be able to see leadership team information

**REQ-6: User Authentication**
- Users must be able to sign in using Supabase Auth
- Users must be able to sign out
- Users must see their profile in navigation bar when logged in
- Users must be redirected to login if accessing protected routes without authentication

#### 3.2 Authenticated User Requirements

**REQ-7: User Dashboard**
- Authenticated users must be able to view their bookings
- Users must be able to see upcoming and past bookings in separate tabs
- Users must be able to view booking details (service, date, time, status, price)
- Users must be able to cancel bookings
- System must send cancellation email notification
- Dashboard must be protected route (requires authentication)

**REQ-8: User Profile**
- Authenticated users must see their profile dropdown in navigation
- Users must see their name and email in profile dropdown
- Users must be able to access dashboard from profile dropdown
- Users must be able to sign out from profile dropdown

#### 3.3 Admin User Requirements

**REQ-9: Admin Dashboard**
- Admin users must be able to view overview statistics
- Admin users must be able to view all bookings
- Admin users must be able to update booking status (pending, confirmed, in_progress, completed, cancelled)
- Admin users must be able to view all contact messages
- Admin users must be able to update message status (new, read, replied, archived)
- System must send email notifications when booking status is updated
- Admin dashboard must be protected route (requires admin role)

### 4. Functional Requirements

**FR-1: Price Calculation**
- System must calculate booking price based on service base price and property size multiplier
- Property sizes: studio (1x), 1bed (1.2x), 2bed (1.4x), 3bed (1.6x), 4bed (1.8x), 5bed+ (2.1x), small_office (1.5x), medium_office (2x), large_office (2.5x)

**FR-2: Booking Status Management**
- Booking statuses: pending, confirmed, in_progress, completed, cancelled
- System must enforce status transition rules
- Only pending and confirmed bookings can be modified

**FR-3: Email Notifications**
- System must send booking confirmation emails
- System must send booking status update emails
- System must send contact form confirmation emails
- System must send admin notifications
- Email operations must be non-blocking (graceful failure)

**FR-4: Data Persistence**
- All bookings must be stored in Supabase bookings table
- All services must be stored in Supabase services table
- All contact messages must be stored in Supabase contact_messages table
- Row Level Security (RLS) must be enabled on all tables

**FR-5: Responsive Design**
- Application must be responsive on mobile, tablet, and desktop devices
- Navigation must have mobile menu for small screens
- All forms must be usable on mobile devices

### 5. Non-Functional Requirements

**NFR-1: Performance**
- Pages must load within 2 seconds
- Images must be optimized
- React Query must cache API responses

**NFR-2: Accessibility**
- Application must follow WCAG 2.1 AA standards
- All interactive elements must be keyboard accessible
- ARIA labels must be provided where needed

**NFR-3: Security**
- Authentication must be handled via Supabase Auth
- API keys must not be exposed in frontend code
- RLS policies must protect database access

**NFR-4: User Experience**
- Smooth animations using Framer Motion
- Loading states for async operations
- Error handling with user-friendly messages
- Empty states for no data scenarios

### 6. Routes

- `/` - Home page
- `/services` - Services listing page
- `/booking` - Booking wizard (4 steps)
- `/contact` - Contact form page
- `/about` - About page
- `/dashboard` - User dashboard (protected)
- `/admin` - Admin dashboard (protected, admin only)

### 7. Database Schema

**bookings table:**
- id, service_id, service_name, customer_email, customer_name, customer_phone
- scheduled_date, scheduled_time, address_line1, address_line2, city, zip_code
- property_size, special_instructions, status, total_price, admin_notes
- created_at, updated_at

**services table:**
- id, name, slug, description, long_description, included_items
- duration_hours, base_price, icon, image, is_active, display_order
- created_at, updated_at

**contact_messages table:**
- id, name, email, phone, subject, message, status
- created_at, updated_at

### 8. Test Scope

The test plan should cover:
1. Home page navigation and content display
2. Services page browsing and service details
3. Complete booking flow (all 4 steps)
4. Contact form submission
5. User authentication (login/logout)
6. User dashboard functionality
7. Admin dashboard functionality (if admin access available)
8. Responsive design on different screen sizes
9. Form validation
10. Error handling

