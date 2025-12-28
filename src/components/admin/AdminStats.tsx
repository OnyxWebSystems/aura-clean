import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getBookingStatusLabel, isValidBookingStatus } from '../../utils/bookingStatus';
import type { BookingStatus } from '../../utils/bookingStatus';

interface AdminStatsProps {
  bookings: any[];
  customers: any[];
  messages: any[];
}

export default function AdminStats({ bookings, customers, messages }: AdminStatsProps) {
  const pendingBookings = bookings.filter((b) => {
    const status = isValidBookingStatus(b.status) ? b.status : ('pending' as BookingStatus);
    return status === 'pending';
  }).length;

  const completedBookings = bookings.filter((b) => {
    const status = isValidBookingStatus(b.status) ? b.status : ('pending' as BookingStatus);
    return status === 'completed';
  }).length;

  const newMessages = messages.filter((m) => m.status === 'new').length;

  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: CalendarDays,
      color: 'emerald',
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings,
      icon: CalendarDays,
      color: 'yellow',
    },
    {
      label: 'Completed Bookings',
      value: completedBookings,
      icon: CheckCircle2,
      color: 'emerald',
    },
    {
      label: 'Total Customers',
      value: customers.length,
      icon: Users,
      color: 'blue',
    },
    {
      label: 'New Messages',
      value: newMessages,
      icon: MessageSquare,
      color: 'red',
    },
  ];

  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${colorClasses[stat.color]} rounded-xl flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

