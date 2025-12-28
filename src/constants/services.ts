/**
 * Centralized service definitions and constants
 */

import { Home, Building2, Sparkles, Truck } from 'lucide-react';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string;
  included_items: string[];
  duration_hours: number;
  base_price: number;
  icon: 'Home' | 'Building2' | 'Sparkles' | 'Truck';
  image: string;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'residential',
    slug: 'residential-cleaning',
    name: 'Residential Cleaning',
    description: 'Comprehensive home cleaning tailored to your lifestyle and schedule.',
    long_description:
      'Our residential cleaning service transforms your home into a sanctuary. Using premium, eco-friendly products, our trained professionals meticulously clean every room, ensuring your space is not just clean, but truly pristine. Whether you need weekly maintenance or occasional deep cleaning, we adapt to your needs.',
    included_items: [
      'All rooms dusted and vacuumed',
      'Kitchen surfaces sanitized',
      'Bathrooms deep cleaned',
      'Floors mopped and polished',
      'Beds made with fresh linens',
      'Trash emptied and liners replaced',
      'Mirrors and glass cleaned',
      'Light switches and handles sanitized',
    ],
    duration_hours: 3,
    base_price: 149,
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 'office',
    slug: 'office-cleaning',
    name: 'Office Cleaning',
    description: 'Professional commercial cleaning that reflects your business standards.',
    long_description:
      'First impressions matter in business. Our office cleaning service ensures your workspace projects professionalism and attention to detail. We work around your schedule—early mornings, evenings, or weekends—to minimize disruption while maximizing cleanliness.',
    included_items: [
      'Workspace and desk cleaning',
      'Common area maintenance',
      'Kitchen/break room sanitation',
      'Restroom deep cleaning',
      'Floor care (carpet/hard surfaces)',
      'Trash and recycling management',
      'Glass and window cleaning',
      'High-touch surface disinfection',
    ],
    duration_hours: 4,
    base_price: 299,
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'deep',
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'Intensive cleaning that reaches every corner of your space.',
    long_description:
      "Our deep cleaning service goes beyond the surface. We tackle the areas that don't get attention during routine cleaning—inside cabinets, behind appliances, under furniture, and more. Perfect for spring cleaning, pre-event preparation, or when your space needs extra attention.",
    included_items: [
      'Inside oven and refrigerator',
      'Cabinet interiors wiped',
      'Baseboards and crown molding',
      'Window tracks and blinds',
      'Light fixtures and ceiling fans',
      'Behind and under furniture',
      'Grout and tile deep clean',
      'Wall spot cleaning',
    ],
    duration_hours: 6,
    base_price: 349,
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
  },
  {
    id: 'movein',
    slug: 'move-in-out-cleaning',
    name: 'Move-In/Out Cleaning',
    description: 'Complete cleaning for seamless real estate transitions.',
    long_description:
      "Moving is stressful enough without worrying about cleaning. Our move-in/out service ensures you leave your old place spotless for the next occupant and arrive at your new home ready to settle in. We're trusted by leading real estate agents and property managers across the region.",
    included_items: [
      'Complete interior cleaning',
      'All appliances inside and out',
      'Cabinet and closet cleaning',
      'Light fixtures and ceiling fans',
      'Window cleaning (interior)',
      'Garage sweeping and spot cleaning',
      'Final inspection walkthrough',
      'Touch-up as needed',
    ],
    duration_hours: 8,
    base_price: 449,
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
];

export const SERVICE_ICON_MAP = {
  Home,
  Building2,
  Sparkles,
  Truck,
} as const;

export const SERVICE_NAMES: Record<string, string> = {
  'residential-cleaning': 'Residential Cleaning',
  'office-cleaning': 'Office Cleaning',
  'deep-cleaning': 'Deep Cleaning',
  'move-in-out-cleaning': 'Move-In/Out Cleaning',
};

