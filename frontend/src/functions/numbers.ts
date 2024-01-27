/**
 * Formatea un número para mostrarlo de manera legible.
 *
 * @param number - Número que se formateará.
 * @returns Una cadena formateada representando el número. Si el número es grande, se formatea con la notación "K" o "M".
 * @example
 * const result = formatNumber(1234567);
 * console.log(result); // "1.2M"
 */
export const formatNumber = (number: number): string | number => {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number;
  }
};
