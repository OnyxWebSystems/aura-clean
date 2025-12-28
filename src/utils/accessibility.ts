/**
 * Accessibility utilities for consistent ARIA attributes and keyboard navigation
 */

import type { KeyboardEvent } from 'react';

/**
 * Generates a unique ID for ARIA attributes
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Common ARIA live region announcements
 */
export const ARIA_LIVE_REGIONS = {
  polite: 'polite',
  assertive: 'assertive',
  off: 'off',
} as const;

/**
 * Keyboard event helpers
 */
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  TAB: 'Tab',
} as const;

/**
 * Checks if an event is a keyboard activation (Enter or Space)
 */
export function isKeyboardActivation(event: KeyboardEvent): boolean {
  return event.key === KEYBOARD_KEYS.ENTER || event.key === KEYBOARD_KEYS.SPACE;
}

/**
 * Handles keyboard navigation for carousels and sliders
 */
export function handleCarouselNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  onNavigate: (newIndex: number) => void
): void {
  if (event.key === KEYBOARD_KEYS.ARROW_LEFT) {
    event.preventDefault();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
    onNavigate(newIndex);
  } else if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) {
    event.preventDefault();
    const newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }
}

