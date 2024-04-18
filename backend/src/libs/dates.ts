import { DateObj } from "../interfaces/Post";

/**
 * Obtiene la fecha actual.
 * @returns Un objeto con las propiedades `day`, `month` y `year`.
 * @example const today = getDate();
 * console.log(today); // {day: 26, month: "Enero", year: 2024}
 */
export var getDate = (): DateObj => {
  var months = [
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
  var now = new Date();
  var day = now.getUTCDate();
  var month = months[now.getUTCMonth()];
  var year = now.getUTCFullYear();
  return { day: day, month: month, year: year };
};
