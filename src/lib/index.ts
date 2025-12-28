/**
 * Central export file for all library utilities
 */

// Supabase
export { supabase } from './supabase';
export * from './supabase-queries';
export type { Database, Booking, BookingInsert, BookingUpdate, Service, ServiceInsert, ServiceUpdate, ContactMessage, ContactMessageInsert, ContactMessageUpdate, User } from './supabase';

// Resend
export { resend, EMAIL_CONFIG } from './resend';
export { emailTemplates } from './resend';

