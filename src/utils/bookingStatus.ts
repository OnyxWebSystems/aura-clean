export const BOOKING_STATUSES = {
  pending: {
    label: 'Pending',
    canModify: true,
  },
  confirmed: {
    label: 'Confirmed',
    canModify: true,
  },
  in_progress: {
    label: 'In Progress',
    canModify: false,
  },
  completed: {
    label: 'Completed',
    canModify: false,
  },
  cancelled: {
    label: 'Cancelled',
    canModify: false,
  },
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUSES;

/**
 * Checks if a booking status allows modifications
 */
export function canModifyBooking(status: BookingStatus): boolean {
  return BOOKING_STATUSES[status]?.canModify ?? false;
}

/**
 * Gets the display label for a booking status
 */
export function getBookingStatusLabel(status: BookingStatus): string {
  return BOOKING_STATUSES[status]?.label ?? status;
}

/**
 * Validates if a string is a valid booking status
 */
export function isValidBookingStatus(status: string): status is BookingStatus {
  return status in BOOKING_STATUSES;
}

