export const PROPERTY_SIZE_MULTIPLIER = {
  studio: 1,
  '1bed': 1.2,
  '2bed': 1.4,
  '3bed': 1.6,
  '4bed': 1.8,
  '5bed+': 2.1,
  small_office: 1.5,
  medium_office: 2,
  large_office: 2.5,
} as const;

export type PropertySize = keyof typeof PROPERTY_SIZE_MULTIPLIER;

export interface Service {
  base_price: number;
}

/**
 * Calculates the final booking price based on service base price and property size
 * @param service - Service object with base_price
 * @param propertySize - Property size key
 * @returns Rounded price in the service's currency
 */
export function calculateBookingPrice(
  service: Service,
  propertySize: PropertySize
): number {
  const multiplier = PROPERTY_SIZE_MULTIPLIER[propertySize] ?? 1;
  return Math.round(service.base_price * multiplier);
}

/**
 * Validates if a string is a valid property size
 */
export function isValidPropertySize(size: string): size is PropertySize {
  return size in PROPERTY_SIZE_MULTIPLIER;
}

/**
 * Gets all available property sizes
 */
export function getAvailablePropertySizes(): PropertySize[] {
  return Object.keys(PROPERTY_SIZE_MULTIPLIER) as PropertySize[];
}

