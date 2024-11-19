/**
 * Capitalizes the first letter of each word in a string and converts the rest to lowercase.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} - The string with the first letter of each word capitalized.
 *
 * @example
 * const result = capitalize("hello world");
 * console.log(result); // "Hello World"
 */
export const capitalize = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
