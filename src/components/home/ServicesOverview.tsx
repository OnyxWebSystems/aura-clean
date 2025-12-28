import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Home, Building2, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DEFAULT_SERVICES, SERVICE_ICON_MAP } from '../../constants/services';
import { getServiceIcon, formatPrice } from '../../utils/serviceHelpers';

interface ServiceCard {
  icon: 'Home' | 'Building2' | 'Sparkles' | 'Truck';
  title: string;
  description: string;
  features: string[];
  image: string;
  slug: string;
}

const services: ServiceCard[] = [
  {
    icon: 'Home',
    title: 'Residential Cleaning',
    description:
      'Comprehensive home cleaning tailored to your lifestyle. From routine maintenance to detailed deep cleans.',
    features: ['Weekly/Bi-weekly service', 'Eco-friendly products', 'Background-checked staff'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    slug: 'residential-cleaning',
  },
  {
    icon: 'Building2',
    title: 'Office Cleaning',
    description:
      'Professional commercial cleaning that reflects your business standards. First impressions matter.',
    features: ['After-hours service', 'Sanitization protocols', 'Custom schedules'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    slug: 'office-cleaning',
  },
  {
    icon: 'Sparkles',
    title: 'Deep Cleaning',
    description:
      'Intensive cleaning that reaches every corner. Perfect for seasonal refreshes or special occasions.',
    features: ['Baseboards & blinds', 'Inside appliances', 'Cabinet interiors'],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
    slug: 'deep-cleaning',
  },
  {
    icon: 'Truck',
    title: 'Move-In/Out Cleaning',
    description:
      'Start fresh or leave it spotless. Complete cleaning for real estate transitions.',
    features: ['Same-day available', 'Real estate approved', 'Deposit-back guarantee'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    slug: 'move-in-out-cleaning',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-gray-50" aria-labelledby="services-overview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-overview-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive cleaning solutions for every need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.icon);
            const defaultService = DEFAULT_SERVICES.find((s) => s.slug === service.slug);
            const price = defaultService ? formatPrice(defaultService.base_price) : null;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  {price && (
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs text-gray-500">From</span>
                      <div className="text-lg font-bold text-[#1a1a2e]">{price}</div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6" role="list">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-1" aria-hidden="true">
                          •
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`${createPageUrl('Services')}#${service.slug}`}
                    className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 text-sm"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to={createPageUrl('Services')}>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

