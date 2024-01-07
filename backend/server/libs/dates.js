export const getDate = () => {
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
