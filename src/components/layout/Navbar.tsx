import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { authQueries, supabase } from '@/lib';
import { Menu, X, Phone, Mail, ChevronDown, LayoutDashboard, Shield, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: createPageUrl('Home'), exact: true },
  { name: 'Services', path: createPageUrl('Services') },
  { name: 'About', path: createPageUrl('About') },
  { name: 'Contact', path: createPageUrl('Contact') },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authQueries.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authQueries.signOut();
      setUser(null);
      navigate(createPageUrl('Home'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] text-white py-2 text-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Contact Info */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="tel:1-800-PRISTINE"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                aria-label="Call us at 1-800-PRISTINE"
              >
                <Phone className="w-4 h-4" />
                <span>1-800-PRISTINE</span>
              </a>
              <a
                href="mailto:hello@pristineco.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                aria-label="Email us at hello@pristineco.com"
              >
                <Mail className="w-4 h-4" />
                <span>hello@pristineco.com</span>
              </a>
            </div>

            {/* Right: Service Area */}
            <div className="text-xs md:text-sm">
              <span>Serving Metropolitan Areas Nationwide</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg'
            : 'bg-[#1a1a2e]'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to={createPageUrl('Home')}
              className="flex items-center gap-3 group"
              aria-label="Pristine & Co. Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xl">P</span>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">
                  Pristine & Co.
                </span>
                <span className="block text-xs text-gray-300 font-medium uppercase tracking-wide">
                  Premium Cleaning
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const active = isActive(link.path, link.exact);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-2 py-2 font-medium transition-all duration-200 ${
                      active
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              {/* Show "My Bookings" when authenticated */}
              {!isLoading && user && (
                <Link
                  to={createPageUrl('Dashboard')}
                  className={`relative px-2 py-2 font-medium transition-all duration-200 flex items-center gap-1 ${
                    isActive(createPageUrl('Dashboard'))
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Bookings
                  {isActive(createPageUrl('Dashboard')) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* User Profile / Auth */}
              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full px-3 py-2 h-auto"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-semibold">
                          {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() ||
                            user.email?.charAt(0)?.toUpperCase() ||
                            'U'}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <div className="px-3 py-2 border-b">
                      <p className="font-medium text-sm text-gray-900">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        to={createPageUrl('Dashboard')}
                        className="cursor-pointer flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user.user_metadata?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link
                          to={createPageUrl('AdminDashboard')}
                          className="cursor-pointer flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login', { state: { from: location } })}
                  className="text-white hover:bg-white/10"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Button>
              )}

              {/* Book Now Button */}
              <Link to={createPageUrl('Booking')}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 shadow-lg hover:shadow-xl">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-[120px] right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Logo */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to={createPageUrl('Home')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-[#1a1a2e]">Pristine & Co.</span>
                      <span className="block text-xs text-gray-500 uppercase">Premium Cleaning</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Contact Info */}
                <div className="mb-6 pb-6 border-b space-y-3">
                  <a
                    href="tel:1-800-PRISTINE"
                    className="flex items-center gap-2 text-gray-700 hover:text-emerald-600"
                  >
                    <Phone className="w-4 h-4" />
                    <span>1-800-PRISTINE</span>
                  </a>
                  <a
                    href="mailto:hello@pristineco.com"
                    className="flex items-center gap-2 text-gray-700 hover:text-emerald-600"
                  >
                    <Mail className="w-4 h-4" />
                    <span>hello@pristineco.com</span>
                  </a>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2" aria-label="Mobile navigation">
                  {navLinks.map((link) => {
                    const active = isActive(link.path, link.exact);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                          active
                            ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  {/* Show "My Bookings" when authenticated */}
                  {!isLoading && user && (
                    <Link
                      to={createPageUrl('Dashboard')}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        isActive(createPageUrl('Dashboard'))
                          ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Bookings
                    </Link>
                  )}
                </nav>

                {/* Mobile Auth Section */}
                {!isLoading && (
                  <div className="mt-6 pt-6 border-t">
                    {user ? (
                      <div className="space-y-2">
                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                          <p className="font-medium text-sm text-gray-900">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to={createPageUrl('Dashboard')}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          My Dashboard
                        </Link>
                        {user.user_metadata?.role === 'admin' && (
                          <Link
                            to={createPageUrl('AdminDashboard')}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          window.location.href = '/login';
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Sign In
                      </button>
                    )}
                  </div>
                )}

                {/* Mobile CTA */}
                <div className="mt-8 pt-8 border-t">
                  <Link to={createPageUrl('Booking')} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

