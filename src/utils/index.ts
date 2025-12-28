/**
 * Utility functions for routing and page URLs
 */

export function createPageUrl(pageName: string): string {
  const routes: Record<string, string> = {
    Home: '/',
    Services: '/services',
    Booking: '/booking',
    Contact: '/contact',
    About: '/about',
    Dashboard: '/dashboard',
    AdminDashboard: '/admin',
  };

  return routes[pageName] || '/';
}

