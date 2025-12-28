import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useMutation } from '@tanstack/react-query';
import { bookingQueries, emailTemplates, authQueries, supabase } from '../lib';
import { calculateBookingPrice } from '../utils/pricing';
import type { PropertySize } from '../utils/pricing';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import BookingSteps from '../components/booking/BookingSteps';
import ServiceSelection from '../components/booking/ServiceSelection';
import ScheduleSelection from '../components/booking/ScheduleSelection';
import DetailsForm from '../components/booking/DetailsForm';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import { getServiceNameBySlug } from '../utils/serviceHelpers';
import { getBookingStatusLabel, isValidBookingStatus } from '../utils/bookingStatus';
import type { BookingStatus } from '../utils/bookingStatus';
import { DEFAULT_SERVICES } from '../constants/services';

export default function Booking() {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [bookingComplete, setBookingComplete] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authQueries.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          setFormData((prev) => ({
            ...prev,
            customer_email: currentUser.email || '',
            customer_name: currentUser.user_metadata?.full_name || '',
          }));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        // User is not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        setFormData((prev) => ({
          ...prev,
          customer_email: session.user.email || '',
          customer_name: session.user.user_metadata?.full_name || '',
        }));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, []);

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      try {
        // Get current user email to verify
        const { data: { session } } = await supabase.auth.getSession();
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        const userEmail = session?.user?.email || currentUser?.email;
        
        console.log('📝 Creating booking:', {
          customer_email: bookingData.customer_email,
          user_email: userEmail,
          emails_match: bookingData.customer_email === userEmail,
          service: bookingData.service_name,
          date: bookingData.scheduled_date,
        });
        
        // Ensure the customer_email matches the authenticated user's email
        if (userEmail && bookingData.customer_email !== userEmail) {
          console.warn('⚠️ Email mismatch - updating customer_email to match user email');
          bookingData.customer_email = userEmail;
        }

        // Calculate final price if property size is provided
        let totalPrice = bookingData.total_price;
        if (bookingData.property_size && selectedService) {
          const service = DEFAULT_SERVICES.find((s) => s.slug === selectedService);
          if (service) {
            totalPrice = calculateBookingPrice(
              service,
              bookingData.property_size as PropertySize
            );
          }
        }

        // Create booking in Supabase
        const booking = await bookingQueries.create({
          service_id: bookingData.service_id,
          service_name: bookingData.service_name,
          customer_email: bookingData.customer_email,
          customer_name: bookingData.customer_name,
          customer_phone: bookingData.customer_phone || null,
          scheduled_date: bookingData.scheduled_date,
          scheduled_time: bookingData.scheduled_time,
          address_line1: bookingData.address_line1,
          address_line2: bookingData.address_line2 || null,
          city: bookingData.city,
          zip_code: bookingData.zip_code,
          property_size: bookingData.property_size,
          special_instructions: bookingData.special_instructions || null,
          status: bookingData.status || 'pending',
          total_price: totalPrice || null,
        });

        console.log('✅ Booking created successfully:', booking.id);

        // Send confirmation email (non-blocking)
        try {
          await emailTemplates.sendBookingConfirmation({
            to: bookingData.customer_email,
            customerName: bookingData.customer_name,
            serviceName: bookingData.service_name,
            scheduledDate: bookingData.scheduled_date,
            scheduledTime: bookingData.scheduled_time,
            address: `${bookingData.address_line1}, ${bookingData.city}`,
            bookingId: booking.id,
          });
        } catch (emailError) {
          console.error('Failed to send booking confirmation email:', emailError);
          // Don't fail the booking if email fails
        }

        return booking;
      } catch (error: any) {
        console.error('❌ Booking creation error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      setCreatedBooking(data);
      setBookingComplete(true);
    },
    onError: (error: any) => {
      console.error('❌ Booking mutation error:', error);
      let errorMessage = 'Failed to create booking. Please try again.';
      
      if (error.message?.includes('permission') || error.message?.includes('policy') || error.code === '42501') {
        errorMessage = 'Permission denied. Please check that the INSERT policy for bookings table allows users to create bookings. The policy should compare the authenticated user\'s email to customer_email.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setBookingError(errorMessage);
    },
  });

  const handleNext = () => {
    if (currentStep === 4) {
      if (!isAuthenticated) {
        navigate('/login', { state: { from: { pathname: '/booking' } } });
        return;
      }
      // Clear any previous errors
      setBookingError(null);
      
      const bookingData = {
        service_id: selectedService,
        service_name: selectedService ? getServiceNameBySlug(selectedService) : '',
        scheduled_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        scheduled_time: selectedTime,
        ...formData,
        status: 'pending' as BookingStatus,
      };
      createBookingMutation.mutate(bookingData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return !!(
          formData.customer_name &&
          formData.customer_email &&
          formData.customer_phone &&
          formData.address_line1 &&
          formData.city &&
          formData.zip_code &&
          formData.property_size
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (bookingComplete) {
    const statusLabel = createdBooking?.status
      ? isValidBookingStatus(createdBooking.status)
        ? getBookingStatusLabel(createdBooking.status)
        : createdBooking.status
      : getBookingStatusLabel('pending');

    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
            role="alert"
            aria-live="polite"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for choosing Pristine & Co. We've sent a confirmation email to{' '}
              <span className="font-medium">{formData.customer_email}</span>.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#1a1a2e] mb-4">Booking Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Service</dt>
                  <dd className="font-medium">
                    {selectedService ? getServiceNameBySlug(selectedService) : 'N/A'}
                  </dd>
                </div>
                {selectedDate && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Date</dt>
                    <dd className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</dd>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Time</dt>
                    <dd className="font-medium">{selectedTime}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="text-emerald-600 font-medium">{statusLabel}</dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Dashboard')}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 w-full sm:w-auto">
                  View My Bookings
                </Button>
              </Link>
              <Link to={createPageUrl('Home')}>
                <Button variant="outline" className="w-full sm:w-auto">
                  Return Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a2e] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Book Your Cleaning
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Schedule your professional cleaning in just a few steps
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <BookingSteps currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <ServiceSelection
                selectedService={selectedService}
                onSelect={setSelectedService}
              />
            )}
            {currentStep === 2 && (
              <ScheduleSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={(date) => setSelectedDate(date || null)}
                onTimeSelect={setSelectedTime}
              />
            )}
            {currentStep === 3 && (
              <DetailsForm formData={formData} onChange={setFormData} user={user} />
            )}
            {currentStep === 4 && (
              <>
                <BookingConfirmation
                  service={selectedService}
                  date={selectedDate}
                  time={selectedTime}
                  formData={formData}
                />
                {bookingError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="text-sm text-red-800 font-medium mb-1">Booking Failed</p>
                      <p className="text-sm text-red-700">{bookingError}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex justify-between mt-12 pt-8 border-t" aria-label="Booking navigation">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack} className="gap-2" aria-label="Go to previous step">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed() || createBookingMutation.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 gap-2"
            aria-label={currentStep === 4 ? 'Confirm booking' : 'Continue to next step'}
          >
            {createBookingMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : currentStep === 4 ? (
              isAuthenticated ? 'Confirm Booking' : 'Sign In to Book'
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </nav>

        {/* Login prompt */}
        {currentStep === 4 && !isAuthenticated && (
          <div
            className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center"
            role="alert"
          >
            <p className="text-amber-800">
              You need to sign in to complete your booking.{' '}
              <button
                onClick={() => navigate('/login', { state: { from: { pathname: '/booking' } } })}
                className="text-amber-900 font-medium underline ml-1 hover:text-amber-950"
              >
                Sign in now
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

