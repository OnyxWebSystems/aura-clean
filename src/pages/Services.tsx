import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, ArrowRight, Star, Shield, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { DEFAULT_SERVICES, SERVICE_ICON_MAP } from '../constants/services';
import { getServiceIcon, getServicePrice, formatPrice } from '../utils/serviceHelpers';
import { createSuccessState, createInitialLoadingState, createErrorState } from '../utils/loadingStates';
import { serviceQueries } from '../lib/supabase-queries';
import type { ServiceItem } from '../constants/services';
import type { Service } from '../lib/supabase';

export default function Services() {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => serviceQueries.getAll(true), // true = active only
    initialData: [],
  });

  const loadingState = isLoading
    ? createInitialLoadingState()
    : error
    ? createErrorState(error instanceof Error ? error : new Error(String(error)))
    : createSuccessState(services.length === 0);

  // Map Supabase services to ServiceItem format, or use defaults
  const displayServices: ServiceItem[] =
    services && services.length > 0
      ? (services as Service[]).map((s) => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          description: s.description,
          long_description: s.long_description || s.description,
          included_items: s.included_items || [],
          duration_hours: s.duration_hours,
          base_price: s.base_price,
          icon: (s.icon as ServiceItem['icon']) || 'Home',
          image: s.image || '',
        }))
      : DEFAULT_SERVICES;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1a1a2e] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
              Professional Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Cleaning Services
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From routine home maintenance to comprehensive commercial solutions, we deliver
              excellence tailored to your specific needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Leaf className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20" aria-label="Available cleaning services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingState.isLoading ? (
            <div className="text-center py-20" role="status" aria-live="polite">
              <p className="text-gray-600">Loading services...</p>
            </div>
          ) : loadingState.error ? (
            <div className="text-center py-20" role="alert">
              <p className="text-red-600">
                Unable to load services. Showing default services.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {displayServices.map((service, index) => {
                const IconComponent = getServiceIcon(service.icon);
                const isReversed = index % 2 === 1;
                const displayPrice = formatPrice(service.base_price);

                return (
                  <motion.div
                    key={service.id || service.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${
                      isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                    } gap-12 items-center`}
                  >
                    {/* Image */}
                    <div className="flex-1 w-full">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={service.image}
                          alt={`${service.name} service`}
                          className="w-full h-80 lg:h-[500px] object-cover"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute top-6 left-6">
                          <div
                            className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"
                            aria-hidden="true"
                          >
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3">
                          <div className="text-sm text-gray-500">Starting at</div>
                          <div className="text-2xl font-bold text-[#1a1a2e]">
                            {displayPrice}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 text-emerald-600 mb-4">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium">
                          Approx. {service.duration_hours} hours
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
                        {service.name}
                      </h2>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {service.long_description}
                      </p>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">
                          What's Included:
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
                          {service.included_items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        to={`${createPageUrl('Booking')}?service=${service.slug || service.id}`}
                        aria-label={`Book ${service.name} service`}
                      >
                        <Button
                          size="lg"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                        >
                          Book This Service
                          <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team is happy to help you choose the perfect cleaning solution for your
              specific situation. Get in touch for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" variant="outline" className="px-8 shadow-lg hover:shadow-xl">
                  Contact Us
                </Button>
              </Link>
              <Link to={createPageUrl('Booking')}>
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 px-8 shadow-lg hover:shadow-xl">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

