import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, User, Phone, Mail, Home } from 'lucide-react';
import { getServiceNameBySlug } from '../../utils/serviceHelpers';
import { getServicePrice, formatPrice } from '../../utils/serviceHelpers';
import { findServiceBySlugOrId } from '../../utils/serviceHelpers';
import { DEFAULT_SERVICES } from '../../constants/services';
import type { PropertySize } from '../../utils/pricing';

interface BookingConfirmationProps {
  service: string | null;
  date: Date | null;
  time: string | null;
  formData: Record<string, any>;
}

export default function BookingConfirmation({
  service,
  date,
  time,
  formData,
}: BookingConfirmationProps) {
  const serviceData = service ? findServiceBySlugOrId(service, DEFAULT_SERVICES) : null;
  const propertySize = formData.property_size as PropertySize | undefined;
  const finalPrice =
    serviceData && propertySize
      ? getServicePrice(serviceData, propertySize)
      : serviceData?.base_price || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Review Your Booking</h2>
        <p className="text-gray-600">Please review your details before confirming</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        {/* Service Summary */}
        <div className="pb-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">Service Details</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Home className="w-8 h-8 text-emerald-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#1a1a2e]">
                {service ? getServiceNameBySlug(service) : 'Service not selected'}
              </p>
              {serviceData && (
                <p className="text-sm text-gray-500">
                  Estimated duration: {serviceData.duration_hours} hours
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#1a1a2e]">{formatPrice(finalPrice)}</p>
              <p className="text-xs text-gray-500">
                {propertySize ? `for ${propertySize.replace('_', ' ')}` : 'starting price'}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1a1a2e]">Schedule</h3>
          <div className="space-y-3">
            {date && (
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-[#1a1a2e]">
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-[#1a1a2e]">{time}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#1a1a2e]">Your Information</h3>
          <div className="space-y-3">
            {formData.customer_name && (
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <span className="font-medium text-[#1a1a2e]">{formData.customer_name}</span>
              </div>
            )}
            {formData.customer_email && (
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <span className="font-medium text-[#1a1a2e]">{formData.customer_email}</span>
              </div>
            )}
            {formData.customer_phone && (
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <span className="font-medium text-[#1a1a2e]">{formData.customer_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Service Location */}
        {(formData.address_line1 || formData.city) && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#1a1a2e]">Service Location</h3>
            <div className="flex items-start gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" aria-hidden="true" />
              <div>
                {formData.address_line1 && (
                  <p className="font-medium text-[#1a1a2e]">{formData.address_line1}</p>
                )}
                {formData.address_line2 && (
                  <p className="text-gray-600">{formData.address_line2}</p>
                )}
                {(formData.city || formData.zip_code) && (
                  <p className="text-gray-600">
                    {formData.city}
                    {formData.city && formData.zip_code ? ', ' : ''}
                    {formData.zip_code}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Special Instructions */}
        {formData.special_instructions && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">Special Instructions</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
              {formData.special_instructions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

