import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  MapPin,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getBookingStatusLabel,
  canModifyBooking,
  isValidBookingStatus,
} from '../../utils/bookingStatus';
import type { BookingStatus } from '../../utils/bookingStatus';
import { formatPrice } from '../../utils/serviceHelpers';

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

interface BookingCardProps {
  booking: Booking;
  onCancel?: (booking: Booking) => void;
  onReschedule?: (booking: Booking) => void;
  showActions?: boolean;
}

const statusIcons = {
  pending: AlertCircle,
  confirmed: CheckCircle2,
  in_progress: Loader2,
  completed: CheckCircle2,
  cancelled: XCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function BookingCard({
  booking,
  onCancel,
  onReschedule,
  showActions = true,
}: BookingCardProps) {
  const status = isValidBookingStatus(booking.status)
    ? booking.status
    : ('pending' as BookingStatus);
  const statusLabel = getBookingStatusLabel(status);
  const StatusIcon = statusIcons[status];
  const statusColor = statusColors[status];

  const isPast = new Date(booking.scheduled_date) < new Date();
  const canModify = !isPast && canModifyBooking(status);
  const canCancel = canModify && onCancel && (status === 'pending' || status === 'confirmed');

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[#1a1a2e] text-lg">{booking.service_name}</h3>
          <Badge className={`${statusColor} border mt-2`}>
            <StatusIcon
              className={`w-3 h-3 mr-1 ${
                status === 'in_progress' ? 'animate-spin' : ''
              }`}
              aria-hidden="true"
            />
            {statusLabel}
          </Badge>
        </div>
        {showActions && canModify && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Booking options">
                <MoreVertical className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onReschedule && (
                <DropdownMenuItem onClick={() => onReschedule(booking)}>
                  Reschedule
                </DropdownMenuItem>
              )}
              {onCancel && canModify && (
                <DropdownMenuItem
                  onClick={() => onCancel(booking)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  Cancel Booking
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-[#1a1a2e]">
              {booking.scheduled_date
                ? format(new Date(booking.scheduled_date), 'EEEE, MMMM d, yyyy')
                : 'Not scheduled'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium text-[#1a1a2e]">{booking.scheduled_time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium text-[#1a1a2e]">
              {booking.address_line1}, {booking.city}
            </p>
          </div>
        </div>
      </div>
      {booking.total_price && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-gray-500">Total</span>
          <span className="font-bold text-[#1a1a2e] text-lg">
            {formatPrice(booking.total_price)}
          </span>
        </div>
      )}
      {canCancel && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onCancel?.(booking)}
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            aria-label={`Cancel ${booking.service_name} booking`}
          >
            <XCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            Cancel Booking
          </Button>
        </div>
      )}
    </div>
  );
}
