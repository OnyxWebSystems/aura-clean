import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  Loader2,
  Menu,
  Bell,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminStats from '../components/admin/AdminStats';
import AdminBookingsTable from '../components/admin/AdminBookingsTable';
import { getBookingStatusLabel, isValidBookingStatus } from '../utils/bookingStatus';
import type { BookingStatus } from '../utils/bookingStatus';
import { bookingQueries, serviceQueries, contactMessageQueries, emailTemplates } from '../lib';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await base44.auth.isAuthenticated();
      if (!isAuthenticated) {
        base44.auth.redirectToLogin(createPageUrl('AdminDashboard'));
        return;
      }
      const userData = await base44.auth.me();
      if (userData.role !== 'admin') {
        navigate(createPageUrl('Dashboard'));
        return;
      }
      setUser(userData);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const { data: bookings = [], isLoading: bookingsLoading, refetch: refetchBookings } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => bookingQueries.getAll('-created_at'),
    enabled: !loading,
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => contactMessageQueries.getAll('-created_at'),
    enabled: !loading,
  });

  // Note: Users query removed - Supabase Auth handles users differently
  // If you need user data, use Supabase Auth or create a custom query
  const { data: customers = [], isLoading: customersLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: async () => {
      // For now, return empty array - implement user fetching if needed
      // You can use Supabase Auth admin API or create a users table
      return [];
    },
    enabled: !loading,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: BookingStatus }) => {
      // Get booking details first for email
      const booking = await bookingQueries.getById(bookingId);
      
      // Update booking status
      const updated = await bookingQueries.update(bookingId, { status });

      // Send status update email (non-blocking)
      try {
        await emailTemplates.sendBookingStatusUpdate({
          to: booking.customer_email,
          customerName: booking.customer_name,
          serviceName: booking.service_name,
          status: status,
          scheduledDate: booking.scheduled_date,
          scheduledTime: booking.scheduled_time,
        });
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the update if email fails
      }

      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const updateMessageMutation = useMutation({
    mutationFn: async ({
      messageId,
      status,
    }: {
      messageId: string;
      status: 'new' | 'read' | 'replied' | 'archived';
    }) => {
      return await contactMessageQueries.update(messageId, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    },
  });

  const handleStatusChange = (bookingId: string, status: BookingStatus) => {
    updateStatusMutation.mutate({ bookingId, status });
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setDetailsDialogOpen(true);
  };

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  const filteredBookings = (bookings as any[]).filter((booking) => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      booking.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
        <span className="sr-only">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          user={user}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-64">
            <AdminSidebar
              user={user}
              currentSection={currentSection}
              onSectionChange={(section) => {
                setCurrentSection(section);
                setMobileMenuOpen(false);
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#1a1a2e]">
                  {currentSection === 'overview' && 'Dashboard Overview'}
                  {currentSection === 'bookings' && 'Manage Bookings'}
                  {currentSection === 'customers' && 'Customers'}
                  {currentSection === 'services' && 'Services'}
                  {currentSection === 'messages' && 'Contact Messages'}
                </h1>
                <p className="text-sm text-gray-500">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => refetchBookings()}
                aria-label="Refresh data"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
                <Bell className="w-4 h-4" aria-hidden="true" />
                {(messages as any[]).filter((m) => m.status === 'new').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {(messages as any[]).filter((m) => m.status === 'new').length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Overview Section */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              <AdminStats
                bookings={bookings as any[]}
                customers={customers as any[]}
                messages={messages as any[]}
              />
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest booking requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(bookings as any[]).slice(0, 5).map((booking) => {
                        const status = isValidBookingStatus(booking.status)
                          ? booking.status
                          : ('pending' as BookingStatus);
                        const statusLabel = getBookingStatusLabel(status);
                        return (
                          <div
                            key={booking.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                          >
                            <div>
                              <p className="font-medium text-[#1a1a2e]">{booking.customer_name}</p>
                              <p className="text-sm text-gray-500">{booking.service_name}</p>
                            </div>
                            <Badge
                              className={
                                status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : status === 'confirmed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-gray-100 text-gray-800'
                              }
                            >
                              {statusLabel}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Latest contact form submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(messages as any[]).slice(0, 5).map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start justify-between p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#1a1a2e] truncate">{message.name}</p>
                            <p className="text-sm text-gray-500 truncate">
                              {message.subject || message.message?.substring(0, 50)}
                            </p>
                          </div>
                          <Badge
                            className={
                              message.status === 'new'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {message.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Bookings Section */}
          {currentSection === 'bookings' && (
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        placeholder="Search by customer name, email, or service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        aria-label="Search bookings"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                      className="w-full md:w-48"
                      aria-label="Filter by status"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Bookings Table */}
              <Card>
                <CardContent className="pt-6">
                  <AdminBookingsTable
                    bookings={filteredBookings}
                    onStatusChange={handleStatusChange}
                    onView={handleViewBooking}
                    isLoading={bookingsLoading}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Customers Section */}
          {currentSection === 'customers' && (
            <Card>
              <CardHeader>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>Registered users and their details</CardDescription>
              </CardHeader>
              <CardContent>
                {customersLoading ? (
                  <div className="flex justify-center py-12" role="status" aria-live="polite">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
                    <span className="sr-only">Loading customers...</span>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(customers as any[]).map((customer) => (
                      <div key={customer.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center"
                            aria-label={`${customer.full_name || customer.email} avatar`}
                          >
                            <span className="text-white font-medium">
                              {customer.full_name?.charAt(0) ||
                                customer.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#1a1a2e] truncate">
                              {customer.full_name || 'No name'}
                            </p>
                            <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t text-sm text-gray-500">
                          {(bookings as any[]).filter((b) => b.customer_email === customer.email)
                            .length}{' '}
                          bookings
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Messages Section */}
          {currentSection === 'messages' && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Messages from the contact form</CardDescription>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="flex justify-center py-12" role="status" aria-live="polite">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
                    <span className="sr-only">Loading messages...</span>
                  </div>
                ) : (messages as any[]).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(messages as any[]).map((message) => (
                      <div
                        key={message.id}
                        className={`p-6 rounded-xl border ${
                          message.status === 'new'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-semibold text-[#1a1a2e]">{message.name}</p>
                            <p className="text-sm text-gray-500">{message.email}</p>
                            {message.phone && (
                              <p className="text-sm text-gray-500">{message.phone}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                message.status === 'new'
                                  ? 'bg-red-100 text-red-800'
                                  : message.status === 'read'
                                  ? 'bg-blue-100 text-blue-800'
                                  : message.status === 'replied'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-gray-100 text-gray-800'
                              }
                            >
                              {message.status}
                            </Badge>
                          </div>
                        </div>
                        {message.subject && (
                          <p className="font-medium text-[#1a1a2e] mb-2">
                            Subject: {message.subject}
                          </p>
                        )}
                        <p className="text-gray-700">{message.message}</p>
                        <div className="mt-4 pt-4 border-t flex gap-2">
                          {message.status === 'new' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateMessageMutation.mutate({
                                  messageId: message.id,
                                  status: 'read',
                                })
                              }
                            >
                              Mark as Read
                            </Button>
                          )}
                          {message.status !== 'replied' && (
                            <Button
                              size="sm"
                              onClick={() =>
                                updateMessageMutation.mutate({
                                  messageId: message.id,
                                  status: 'replied',
                                })
                              }
                            >
                              Mark as Replied
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Services Section */}
          {currentSection === 'services' && (
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Manage your cleaning services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Service management features coming soon.
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-500">Current Status</span>
                <Badge
                  className={
                    selectedBooking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : selectedBooking.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedBooking.status === 'in_progress'
                      ? 'bg-purple-100 text-purple-800'
                      : selectedBooking.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {isValidBookingStatus(selectedBooking.status)
                    ? getBookingStatusLabel(selectedBooking.status)
                    : selectedBooking.status}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1a1a2e]">Customer Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{selectedBooking.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{selectedBooking.customer_email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{selectedBooking.customer_phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
                {/* Service Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1a1a2e]">Service Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{selectedBooking.service_name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>
                        {selectedBooking.scheduled_date
                          ? format(new Date(selectedBooking.scheduled_date), 'MMMM d, yyyy')
                          : 'Not scheduled'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{selectedBooking.scheduled_time}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Address */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#1a1a2e]">Service Location</h4>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" aria-hidden="true" />
                  <div>
                    <p>{selectedBooking.address_line1}</p>
                    {selectedBooking.address_line2 && <p>{selectedBooking.address_line2}</p>}
                    <p>
                      {selectedBooking.city}, {selectedBooking.zip_code}
                    </p>
                  </div>
                </div>
              </div>
              {/* Special Instructions */}
              {selectedBooking.special_instructions && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1a1a2e]">Special Instructions</h4>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                    {selectedBooking.special_instructions}
                  </p>
                </div>
              )}
              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                  disabled={selectedBooking.status === 'confirmed'}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" aria-hidden="true" />
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange(selectedBooking.id, 'in_progress')}
                  disabled={selectedBooking.status === 'in_progress'}
                >
                  Start Service
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                  disabled={selectedBooking.status === 'completed'}
                >
                  Mark Completed
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                  disabled={selectedBooking.status === 'cancelled'}
                >
                  <XCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

