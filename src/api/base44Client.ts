/**
 * Base44 Client Stub
 * 
 * This is a placeholder for Base44 authentication.
 * The app is migrating to Supabase Auth, but some components
 * still reference base44.auth methods.
 * 
 * TODO: Replace all base44.auth calls with Supabase Auth
 */

export const base44 = {
  auth: {
    async isAuthenticated(): Promise<boolean> {
      // TODO: Replace with Supabase auth check
      // For now, return false to allow unauthenticated access
      return false;
    },
    async me(): Promise<any> {
      // TODO: Replace with Supabase user fetch
      return null;
    },
    redirectToLogin(redirectUrl?: string): void {
      // TODO: Replace with Supabase auth redirect
      console.warn('Base44 auth redirect - needs Supabase implementation');
    },
    logout(redirectUrl?: string): void {
      // TODO: Replace with Supabase auth logout
      console.warn('Base44 auth logout - needs Supabase implementation');
    },
  },
  entities: {
    // These are no longer used - replaced with Supabase queries
    Service: {
      list: async () => [],
    },
    Booking: {
      create: async () => ({}),
    },
    ContactMessage: {
      create: async () => ({}),
    },
  },
};

