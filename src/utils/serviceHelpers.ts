/**
 * Helper functions for service-related operations
 */

import { DEFAULT_SERVICES, SERVICE_ICON_MAP, SERVICE_NAMES } from '../constants/services';
import type { ServiceItem } from '../constants/services';
import { calculateBookingPrice } from './pricing';
import type { PropertySize } from './pricing';

/**
 * Gets service icon component
 */
export function getServiceIcon(iconName: keyof typeof SERVICE_ICON_MAP) {
  return SERVICE_ICON_MAP[iconName] || SERVICE_ICON_MAP.Home;
}

/**
 * Gets service name by slug
 */
export function getServiceNameBySlug(slug: string): string {
  return SERVICE_NAMES[slug] || slug;
}

/**
 * Finds a service by slug or id
 */
export function findServiceBySlugOrId(
  slugOrId: string,
  services: ServiceItem[] = DEFAULT_SERVICES
): ServiceItem | undefined {
  return services.find((s) => s.slug === slugOrId || s.id === slugOrId);
}

/**
 * Calculates final price for a service with property size
 */
export function getServicePrice(
  service: ServiceItem,
  propertySize?: PropertySize
): number {
  if (!propertySize) {
    return service.base_price;
  }
  return calculateBookingPrice(service, propertySize);
}

/**
 * Formats price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

