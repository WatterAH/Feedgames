export const calculateDate = (obj) => {
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
      return daysPassed == 1 ? "Ayer" : `Hace ${daysPassed} días`;
    }
  } else {
    return `${month} ${day}, ${year}`;
  }
};

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
