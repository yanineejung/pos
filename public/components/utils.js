/**
 * Converts a numeric price value to a formatted Thai Baht currency string.
 *
 * @param {number} price - The price value to format.
 * @returns {string} The formatted price string in Thai Baht currency (THB), with no decimal places.
 */
export const ConvertPriceToThaiBaht = (price) => {
  const formatted = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(price);
  return formatted;
};

/**
 * Creates a debounced version of the provided function that delays its execution until after
 * a specified delay has elapsed since the last time it was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} A debounced version of the provided function.
 */
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
