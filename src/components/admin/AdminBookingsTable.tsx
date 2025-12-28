import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getBookingStatusLabel, isValidBookingStatus } from '../../utils/bookingStatus';
import type { BookingStatus } from '../../utils/bookingStatus';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  service_name: string;
  status: string;
  scheduled_date: string;
  scheduled_time: string;
}

interface AdminBookingsTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  onView: (booking: Booking) => void;
  isLoading: boolean;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

import React from 'react';

export default function AdminBookingsTable({
  bookings,
  onStatusChange,
  onView,
  isLoading,
}: AdminBookingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" aria-hidden="true" />
        <span className="sr-only">Loading bookings...</span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const status = isValidBookingStatus(booking.status)
              ? booking.status
              : ('pending' as BookingStatus);
            const statusLabel = getBookingStatusLabel(status);
            const statusColor = statusColors[status] || statusColors.pending;

            return (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-[#1a1a2e]">{booking.customer_name}</p>
                    <p className="text-sm text-gray-500">{booking.customer_email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-[#1a1a2e]">{booking.service_name}</p>
                </TableCell>
                <TableCell>
                  <div>
                    {booking.scheduled_date && (
                      <p className="text-[#1a1a2e]">
                        {format(new Date(booking.scheduled_date), 'MMM d, yyyy')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">{booking.scheduled_time}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColor}>{statusLabel}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(booking)}
                    aria-label={`View details for booking by ${booking.customer_name}`}
                  >
                    <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

