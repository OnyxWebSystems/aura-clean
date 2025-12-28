import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingQueries, emailTemplates, authQueries, supabase } from '../lib';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  Plus,
  CalendarDays,
  History,
  User,
  LogOut,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCard from '../components/dashboard/BookingCard';
import { getBookingStatusLabel, isValidBookingStatus } from '../utils/bookingStatus';
import { createInitialLoadingState, createSuccessState, createErrorState } from '../utils/loadingStates';
import type { BookingStatus } from '../utils/bookingStatus';

interface Booking {
  id: string;
  service_name: string;
  status: string;
  scheduled_date: string;
  scheduled_time: string;
  address_line1: string;
  city: string;
  total_price?: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authQueries.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        } else {
          // Not authenticated, redirect to login
          navigate('/login', { state: { from: { pathname: '/dashboard' } } });
        }
      } catch (error) {
        // Not authenticated, redirect to login
        console.error('Auth check failed:', error);
        navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        setUser(null);
        navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: () => bookingQueries.getByCustomerEmail(user?.email || ''),
    enabled: !!user?.email && !loading,
  });

  const cancelMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      try {
        // Get current user email from session - try multiple methods
        const { data: { session } } = await supabase.auth.getSession();
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        const userEmail = session?.user?.email || currentUser?.email || user?.email;
        
        if (!userEmail) {
          console.error('❌ No user email found:', { session, currentUser, user });
          throw new Error('You must be signed in to cancel a booking.');
        }
        
        console.log('👤 User email for cancellation:', userEmail);

        // Get booking details first for email - use maybeSingle to avoid coercion errors
        const { data: bookingData, error: getError } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .maybeSingle();

        if (getError) {
          console.error('Error fetching booking:', getError);
          // Continue anyway - we'll try to update
        }
        
        // Verify the booking belongs to the current user before updating
        if (bookingData && bookingData.customer_email !== userEmail) {
          throw new Error('You can only cancel your own bookings.');
        }

        console.log('🔄 Attempting to cancel booking:', {
          bookingId,
          userEmail,
          bookingEmail: bookingData?.customer_email,
        });

        // Update booking status - use array response instead of single()
        const { data: updatedArray, error: updateError } = await supabase
          .from('bookings')
          .update({ 
            status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('id', bookingId)
          .eq('customer_email', userEmail) // Ensure we only update user's own bookings
          .select();

        console.log('📊 Update result:', {
          updatedCount: updatedArray?.length || 0,
          error: updateError,
        });

        if (updateError) {
          console.error('❌ Update error details:', {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint,
          });
          // Check for RLS policy violation
          if (updateError.code === '42501' || updateError.message?.includes('policy') || updateError.message?.includes('permission') || updateError.message?.includes('denied')) {
            throw new Error(`Permission denied (Error ${updateError.code}). Your email: ${userEmail}, Booking email: ${bookingData?.customer_email}. Please check the browser console for details.`);
          }
          throw new Error(updateError.message || 'Failed to cancel booking');
        }

        if (!updatedArray || updatedArray.length === 0) {
          // This usually means RLS blocked the update
          console.error('Update returned no rows - likely RLS policy issue');
          throw new Error('Unable to cancel booking. The database policy may be blocking the update. Please ensure the UPDATE policy allows: (SELECT email FROM auth.users WHERE id = auth.uid()) = customer_email');
        }

        const updated = updatedArray[0];

        // Send status update email (non-blocking)
        const bookingForEmail = bookingData || updated;
        if (bookingForEmail) {
          try {
            await emailTemplates.sendBookingStatusUpdate({
              to: bookingForEmail.customer_email,
              customerName: bookingForEmail.customer_name,
              serviceName: bookingForEmail.service_name,
              status: 'cancelled',
              scheduledDate: bookingForEmail.scheduled_date,
              scheduledTime: bookingForEmail.scheduled_time,
            });
          } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
            // Don't fail the cancellation if email fails
          }
        }

        return updated;
      } catch (error: any) {
        console.error('Cancel booking error:', error);
        throw new Error(error.message || 'Failed to cancel booking. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.email] });
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    },
    onError: (error: any) => {
      console.error('Cancel mutation error:', error);
      // Error will be shown in the UI if needed
    },
  });

  const handleCancel = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (selectedBooking) {
      cancelMutation.mutate(selectedBooking.id);
    }
  };

  const handleLogout = async () => {
    try {
      await authQueries.signOut();
      navigate(createPageUrl('Home'));
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to home even if logout fails
      navigate(createPageUrl('Home'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
        <span className="sr-only">Loading dashboard...</span>
      </div>
    );
  }

  const upcomingBookings = (bookings as Booking[]).filter(
    (b) =>
      new Date(b.scheduled_date) >= new Date() &&
      !['completed', 'cancelled'].includes(b.status)
  );
  const pastBookings = (bookings as Booking[]).filter(
    (b) =>
      new Date(b.scheduled_date) < new Date() ||
      ['completed', 'cancelled'].includes(b.status)
  );
  const completedCount = (bookings as Booking[]).filter((b) => b.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Home')} className="flex items-center gap-3" aria-label="Go to home page">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-semibold text-[#1a1a2e]">Pristine & Co.</span>
                  <span className="block text-xs text-gray-500">Customer Portal</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Booking')}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 hidden sm:flex" aria-label="Create new booking">
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  New Booking
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="font-medium text-[#1a1a2e] text-sm">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"
                  aria-label={`User ${user?.user_metadata?.full_name || user?.email}`}
                >
                  <span className="text-white font-medium">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-500"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
            Welcome back, {user?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-gray-600 mt-1">Manage your bookings and account settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <CalendarDays className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{upcomingBookings.length}</p>
                  <p className="text-gray-500 text-sm">Upcoming Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{completedCount}</p>
                  <p className="text-gray-500 text-sm">Completed Services</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <History className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{bookings.length}</p>
                  <p className="text-gray-500 text-sm">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border">
            <TabsTrigger value="upcoming" className="gap-2">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              Upcoming
              {upcomingBookings.length > 0 && (
                <Badge className="bg-emerald-500 text-white ml-2">
                  {upcomingBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" aria-hidden="true" />
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
                <span className="sr-only">Loading bookings...</span>
              </div>
            ) : upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <CalendarDays className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You don't have any scheduled cleanings. Book one today!
                  </p>
                  <Link to={createPageUrl('Booking')}>
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                      Book a Cleaning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {upcomingBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <BookingCard booking={booking} onCancel={handleCancel} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
                <span className="sr-only">Loading booking history...</span>
              </div>
            ) : pastBookings.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">No Booking History</h3>
                  <p className="text-gray-500">Your completed bookings will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} showActions={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold mb-2">Need Another Cleaning?</h3>
              <p className="text-emerald-100 mb-6">
                Schedule your next professional cleaning in just a few clicks.
              </p>
              <Link to={createPageUrl('Booking')}>
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-8">
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">Have Questions?</h3>
              <p className="text-gray-500 mb-6">
                Our support team is here to help with any inquiries.
              </p>
              <Link to={createPageUrl('Contact')}>
                <Button variant="outline">Contact Support</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" aria-hidden="true" />
              Cancel Booking
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="bg-gray-50 rounded-xl p-4 my-4">
              <p className="font-medium text-[#1a1a2e]">{selectedBooking.service_name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(selectedBooking.scheduled_date), 'MMMM d, yyyy')} at{' '}
                {selectedBooking.scheduled_time}
              </p>
            </div>
          )}
          {cancelMutation.isError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm mb-4" role="alert">
              {cancelMutation.error?.message || 'Failed to cancel booking. Please try again.'}
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setCancelDialogOpen(false);
                setSelectedBooking(null);
                cancelMutation.reset();
              }}
              disabled={cancelMutation.isPending}
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Cancelling...
                </>
              ) : (
                'Yes, Cancel'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

