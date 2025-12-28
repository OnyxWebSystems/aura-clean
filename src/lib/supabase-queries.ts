/**
 * Supabase Database Query Helpers
 * 
 * Centralized functions for common database operations
 */

import { supabase } from './supabase';
import type { Booking, BookingInsert, BookingUpdate, Service, ContactMessage, ContactMessageInsert, ContactMessageUpdate } from './supabase';

/**
 * BOOKING QUERIES
 */
export const bookingQueries = {
  /**
   * Get all bookings
   */
  async getAll(orderBy: string = '-created_at') {
    const [column, order] = orderBy.startsWith('-')
      ? [orderBy.slice(1), 'desc']
      : [orderBy, 'asc'];

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order(column, { ascending: order === 'asc' });

    if (error) throw error;
    return data as Booking[];
  },

  /**
   * Get bookings by customer email
   */
  async getByCustomerEmail(email: string, orderBy: string = '-scheduled_date') {
    const [column, order] = orderBy.startsWith('-')
      ? [orderBy.slice(1), 'desc']
      : [orderBy, 'asc'];

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_email', email)
      .order(column, { ascending: order === 'asc' });

    if (error) throw error;
    return data as Booking[];
  },

  /**
   * Get booking by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Booking;
  },

  /**
   * Create a new booking
   */
  async create(booking: BookingInsert) {
    try {
      console.log('🔵 Booking insert attempt:', {
        customer_email: booking.customer_email,
        service: booking.service_name,
      });
      
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase insert error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw error;
      }
      
      console.log('✅ Booking inserted successfully:', data.id);
      return data as Booking;
    } catch (err: any) {
      console.error('❌ Booking create error:', err);
      throw err;
    }
  },

  /**
   * Update a booking
   */
  async update(id: string, updates: BookingUpdate) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  },

  /**
   * Delete a booking
   */
  async delete(id: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

/**
 * SERVICE QUERIES
 */
export const serviceQueries = {
  /**
   * Get all services
   */
  async getAll(activeOnly: boolean = false) {
    let query = supabase.from('services').select('*');

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query.order('display_order', { ascending: true });

    if (error) throw error;
    return data as Service[];
  },

  /**
   * Get service by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as Service;
  },

  /**
   * Create a service
   */
  async create(service: Service) {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },

  /**
   * Update a service
   */
  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabase
      .from('services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },
};

/**
 * CONTACT MESSAGE QUERIES
 */
export const contactMessageQueries = {
  /**
   * Get all contact messages
   */
  async getAll(orderBy: string = '-created_at') {
    const [column, order] = orderBy.startsWith('-')
      ? [orderBy.slice(1), 'desc']
      : [orderBy, 'asc'];

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order(column, { ascending: order === 'asc' });

    if (error) throw error;
    return data as ContactMessage[];
  },

  /**
   * Create a contact message
   */
  async create(message: ContactMessageInsert) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  },

  /**
   * Update a contact message
   */
  async update(id: string, updates: ContactMessageUpdate) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  },
};

/**
 * AUTH QUERIES
 */
export const authQueries = {
  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  /**
   * Sign in with email
   */
  async signInWithEmail(email: string, password: string) {
    try {
      console.log('🔐 Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('❌ Sign in error:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        
        // Provide more specific error messages
        if (error.message?.includes('Invalid login credentials') || error.message?.includes('invalid_credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message?.includes('Email not confirmed') || error.message?.includes('email_not_confirmed')) {
          throw new Error('EMAIL_NOT_CONFIRMED');
        } else if (error.message?.includes('Too many requests')) {
          throw new Error('Too many login attempts. Please wait a few minutes and try again.');
        } else {
          throw new Error(error.message || 'Failed to sign in. Please try again.');
        }
      }
      
      console.log('✅ Sign in successful:', data.user?.email);
      return data;
    } catch (err: any) {
      console.error('❌ Sign in exception:', err);
      throw err;
    }
  },

  /**
   * Resend email confirmation
   */
  async resendConfirmationEmail(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) throw error;
  },

  /**
   * Sign up with email
   */
  async signUpWithEmail(email: string, password: string, metadata?: Record<string, any>) {
    try {
      console.log('🔐 Attempting sign up for:', email);
      // Note: Supabase URL is configured in supabase.ts
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      
      if (error) {
        console.error('❌ Sign up error:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        throw error;
      }
      
      console.log('✅ Sign up successful:', data);
      return data;
    } catch (err: any) {
      console.error('❌ Sign up exception:', err);
      
      // Handle network errors
      if (
        err.message?.includes('Failed to fetch') ||
        err.message?.includes('NetworkError') ||
        err.message?.includes('Network request failed') ||
        err.name === 'TypeError'
      ) {
        const errorMsg = new Error(
          'Unable to connect to the server. Please check:\n1. Your internet connection\n2. Supabase project is active\n3. Environment variables are set correctly\n4. Restart the dev server after changing .env'
        );
        console.error('🌐 Network error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
        throw errorMsg;
      }
      
      // Re-throw other errors
      throw err;
    }
  },

  /**
   * Sign out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Reset password - send reset email
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  /**
   * Update password (after reset)
   */
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },
};

