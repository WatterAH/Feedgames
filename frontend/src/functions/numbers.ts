/**
 * Formatea un número para mostrarlo de manera legible.
 *
 * @param number - Número que se formateará.
 * @returns Una cadena formateada representando el número. Si el número es grande, se formatea con la notación "K" o "M".
 * @example
 * const result = formatNumber(1234567);
 * console.log(result); // "1.2M"
 */
export const formatNumber = (number: number | undefined): string | number => {
  const safeNum = number ?? 0;
  if (safeNum >= 1e6) {
    return (safeNum / 1e6).toFixed(1) + "M";
  } else if (safeNum >= 1e3) {
    return (safeNum / 1e3).toFixed(1) + "K";
  } else {
    return safeNum;
  }
};
