import * as React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from?: Date; to?: Date };
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  'aria-label'?: string;
}

const Calendar = ({
  mode = 'single',
  selected,
  onSelect,
  disabled,
  className,
  'aria-label': ariaLabel,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = getDay(monthStart);

  // Create array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if a date is selected
  const isSelected = (date: Date): boolean => {
    if (!selected) return false;
    if (mode === 'single' && selected instanceof Date) {
      return isSameDay(date, selected);
    }
    if (mode === 'multiple' && Array.isArray(selected)) {
      return selected.some((d) => isSameDay(date, d));
    }
    if (mode === 'range' && typeof selected === 'object' && 'from' in selected) {
      return (
        (selected.from && isSameDay(date, selected.from)) ||
        (selected.to && isSameDay(date, selected.to))
      );
    }
    return false;
  };

  // Check if a date is disabled
  const isDisabled = (date: Date): boolean => {
    return disabled ? disabled(date) : false;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    if (onSelect) {
      onSelect(date);
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Create empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="w-full aspect-square" />
  ));

  return (
    <div className={cn('w-full', className)} aria-label={ariaLabel} role="application">
      {/* Header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-[#1a1a2e]">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day names header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyCells}
        {daysInMonth.map((date) => {
          const selected = isSelected(date);
          const disabled = isDisabled(date);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={cn(
                'w-full aspect-square rounded-lg text-sm font-medium transition-all',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
                {
                  'bg-emerald-500 text-white hover:bg-emerald-600': selected,
                  'text-gray-400 cursor-not-allowed': disabled,
                  'text-gray-900': !selected && !disabled,
                  'border-2 border-emerald-300': isToday && !selected,
                }
              )}
              aria-label={`Select ${format(date, 'MMMM d, yyyy')}`}
              aria-disabled={disabled}
              aria-selected={selected}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Calendar };

