/**
 * Supabase Client Configuration
 * 
 * This file sets up the Supabase client for database operations.
 * Make sure to set your Supabase URL and anon key in your .env file.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Safely access environment variables
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Configuration Check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlLength: supabaseUrl.length,
    keyLength: supabaseAnonKey.length,
    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    env: import.meta.env,
  });
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file and restart the dev server.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security
  },
  global: {
    headers: {
      'x-client-info': 'aura-clean-web',
    },
  },
});

/**
 * Database Types
 * These should match your Supabase database schema
 */
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          service_id: string;
          service_name: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string | null;
          scheduled_date: string;
          scheduled_time: string;
          address_line1: string;
          address_line2: string | null;
          city: string;
          zip_code: string;
          property_size: string;
          special_instructions: string | null;
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price: number | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          service_name: string;
          customer_email: string;
          customer_name: string;
          customer_phone?: string | null;
          scheduled_date: string;
          scheduled_time: string;
          address_line1: string;
          address_line2?: string | null;
          city: string;
          zip_code: string;
          property_size: string;
          special_instructions?: string | null;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price?: number | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          service_name?: string;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string | null;
          scheduled_date?: string;
          scheduled_time?: string;
          address_line1?: string;
          address_line2?: string | null;
          city?: string;
          zip_code?: string;
          property_size?: string;
          special_instructions?: string | null;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price?: number | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          long_description: string | null;
          included_items: string[] | null;
          duration_hours: number;
          base_price: number;
          icon: string;
          image: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          long_description?: string | null;
          included_items?: string[] | null;
          duration_hours: number;
          base_price: number;
          icon: string;
          image?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          long_description?: string | null;
          included_items?: string[] | null;
          duration_hours?: number;
          base_price?: number;
          icon?: string;
          image?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Type helpers for database operations
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export type Service = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
export type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert'];
export type ContactMessageUpdate = Database['public']['Tables']['contact_messages']['Update'];

export type User = Database['public']['Tables']['users']['Row'];

