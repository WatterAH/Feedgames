import { DateObj } from "../interfaces/Post";

/**
 * Calcula la diferencia de tiempo entre la fecha proporcionada y la fecha actual.
 *
 * @param obj - Objeto de fecha con propiedades `day`, `month` y `year`.
 * @param minimize - Indica si el resultado debe ser minimizado para mostrar solo la información esencial.
 * @returns Una cadena que representa la diferencia de tiempo relativa a la fecha actual.
 * @example
 * const dateObj = { day: 25, month: "Enero", year: 2024 };
 * const result = calculateDate(dateObj, false);
 * console.log(result); // "Hace 1 día"
 */
export const calculateDate = (obj: DateObj, minimize: boolean): string => {
  const { day, month, year } = obj;
  const today = getDate();
  if (today.month == month) {
    if (today.day == day) {
      return "Hoy";
    } else {
      const daysPassed = today.day - obj.day;
      if (daysPassed < 0) {
        return "";
      }
      return daysPassed == 1
        ? "Ayer"
        : minimize
        ? `${daysPassed}d`
        : `Hace ${daysPassed} días`;
    }
  } else {
    return minimize
      ? `${month.slice(0, 3)}, ${day}`
      : `${month} ${day}, ${year}`;
  }
};

/**
 * Obtiene la fecha actual.
 * @returns Un objeto con las propiedades `day`, `month` y `year`.
 * @example const today = getDate();
 * console.log(today); // {day: 26, month: "Enero", year: 2024}
 */
export const getDate = (): DateObj => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const now = new Date();
  const day = now.getUTCDate();
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();

  return { day, month, year };
};

export const getExpirationDate = () => {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  return expirationDate;
};
