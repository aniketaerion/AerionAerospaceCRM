// src/lib/utils/uniqueId.js

/**
 * Generates a unique ID string.
 *
 * @param {string} prefix - Optional prefix to prepend to the ID (default is 'id').
 * @returns {string} A unique ID string like 'id-20250617-x9k3ld2s8'.
 *
 * Example usage:
 * const id = uniqueId('lead'); // "lead-20250617-x9k3ld2s8"
 */
export default function uniqueId(prefix = 'id') {
  const timestamp = Date.now().toString(36); // Base36 timestamp for compactness
  const random = Math.random().toString(36).substr(2, 8); // Random 8-character string
  return `${prefix}-${timestamp}-${random}`;
}
