import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const timeSlots = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

interface ScheduleSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
}

export default function ScheduleSelection({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: ScheduleSelectionProps) {
  const today = startOfToday();
  const minDate = addDays(today, 1);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Choose Date & Time</h2>
        <p className="text-gray-600">Select your preferred appointment slot</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={onDateSelect}
            disabled={(date) => isBefore(date, minDate)}
            className="rounded-lg border bg-white"
            aria-label="Select booking date"
          />
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">Select Time</h3>
          {selectedDate ? (
            <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Time selection">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onTimeSelect(time)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Select ${time} time slot`}
                  >
                    {isSelected && (
                      <div
                        className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <Clock
                        className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? 'text-emerald-700' : 'text-gray-700'
                        }`}
                      >
                        {time}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center" role="status">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-500">Please select a date first to see available time slots</p>
            </div>
          )}
          {selectedDate && selectedTime && (
            <div
              className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200"
              role="status"
              aria-live="polite"
            >
              <p className="text-emerald-800 font-medium text-center">
                Your appointment: {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

