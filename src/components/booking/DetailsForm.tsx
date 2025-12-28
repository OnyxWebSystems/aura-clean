import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { User, Phone, MapPin, Home } from 'lucide-react';
import { PROPERTY_SIZE_MULTIPLIER } from '../../utils/pricing';
import type { PropertySize } from '../../utils/pricing';

interface PropertySizeOption {
  value: PropertySize;
  label: string;
}

const propertySizes: PropertySizeOption[] = [
  { value: 'studio', label: 'Studio' },
  { value: '1bed', label: '1 Bedroom' },
  { value: '2bed', label: '2 Bedrooms' },
  { value: '3bed', label: '3 Bedrooms' },
  { value: '4bed', label: '4 Bedrooms' },
  { value: '5bed+', label: '5+ Bedrooms' },
  { value: 'small_office', label: 'Small Office (< 1,000 sq ft)' },
  { value: 'medium_office', label: 'Medium Office (1,000-3,000 sq ft)' },
  { value: 'large_office', label: 'Large Office (> 3,000 sq ft)' },
];

interface DetailsFormProps {
  formData: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
  user?: any;
}

export default function DetailsForm({ formData, onChange, user }: DetailsFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Your Details</h2>
        <p className="text-gray-600">Please provide your contact and location information</p>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a2e] flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.customer_name || user?.full_name || ''}
              onChange={(e) => handleChange('customer_name', e.target.value)}
              placeholder="John Smith"
              required
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="phone"
                type="tel"
                value={formData.customer_phone || ''}
                onChange={(e) => handleChange('customer_phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="pl-10"
                required
                aria-required="true"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.customer_email || user?.email || ''}
            onChange={(e) => handleChange('customer_email', e.target.value)}
            placeholder="john@example.com"
            disabled={!!user?.email}
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a2e] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          Service Address
        </h3>
        <div className="space-y-2">
          <Label htmlFor="address1">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address1"
            value={formData.address_line1 || ''}
            onChange={(e) => handleChange('address_line1', e.target.value)}
            placeholder="123 Main Street"
            required
            aria-required="true"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address2">Apartment, Suite, etc. (optional)</Label>
          <Input
            id="address2"
            value={formData.address_line2 || ''}
            onChange={(e) => handleChange('address_line2', e.target.value)}
            placeholder="Apt 4B"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="New York"
              required
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">
              ZIP Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zip"
              value={formData.zip_code || ''}
              onChange={(e) => handleChange('zip_code', e.target.value)}
              placeholder="10001"
              required
              aria-required="true"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a2e] flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          Property Details
        </h3>
        <div className="space-y-2">
          <Label htmlFor="size">
            Property Size <span className="text-red-500">*</span>
          </Label>
          <Select
            id="size"
            value={formData.property_size || ''}
            onChange={(e) => handleChange('property_size', e.target.value)}
            required
            aria-required="true"
          >
            <option value="">Select property size</option>
            {propertySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructions">Special Instructions (optional)</Label>
          <Textarea
            id="instructions"
            value={formData.special_instructions || ''}
            onChange={(e) => handleChange('special_instructions', e.target.value)}
            placeholder="Any special requests or access instructions..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

