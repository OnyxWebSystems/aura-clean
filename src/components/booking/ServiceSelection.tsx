import React from 'react';
import { Home, Building2, Sparkles, Truck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { DEFAULT_SERVICES, SERVICE_ICON_MAP } from '../../constants/services';
import { getServiceIcon, formatPrice } from '../../utils/serviceHelpers';

interface ServiceSelectionProps {
  selectedService: string | null;
  onSelect: (serviceId: string) => void;
}

export default function ServiceSelection({
  selectedService,
  onSelect,
}: ServiceSelectionProps) {
  const services = DEFAULT_SERVICES.map((service) => ({
    id: service.slug,
    name: service.name,
    description: service.description,
    price: service.base_price,
    duration: `${service.duration_hours} hours`,
    icon: service.icon,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Select Your Service</h2>
        <p className="text-gray-600">Choose the cleaning service that best fits your needs</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4" role="radiogroup" aria-label="Service selection">
        {services.map((service) => {
          const isSelected = selectedService === service.id;
          const IconComponent = getServiceIcon(service.icon);

          return (
            <motion.button
              key={service.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(service.id)}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${service.name} service`}
            >
              {isSelected && (
                <div
                  className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-emerald-500' : 'bg-gray-100'
                }`}
                aria-hidden="true"
              >
                <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{service.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-[#1a1a2e]">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">starting</span>
                </div>
                <span className="text-sm text-gray-500">~{service.duration}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

