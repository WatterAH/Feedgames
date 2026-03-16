import { format, intervalToDuration } from "date-fns";

export const getExpirationDate = () => {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
  );
  return expirationDate;
};

export const interval = (
  startDate: string,
  mode: "short" | "large" = "large",
) => {
  const start = new Date(startDate);
  const end = new Date();

  const interval = intervalToDuration({ start, end });

  if (interval.months && interval.months > 0 && mode === "short") {
    return format(start, "dd/MM/yyyy");
  }

  if (interval.years && interval.years > 0) {
    return `hace ${interval.years} ${interval.years === 1 ? "año" : "años"}`;
  }

  if (interval.months && interval.months > 0) {
    return `hace ${interval.months} ${interval.months === 1 ? "mes" : "meses"}`;
  }

  if (interval.days && interval.days >= 7) {
    const weeks = Math.floor(interval.days / 7);
    return `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }

  if (interval.days && interval.days > 0) {
    return `hace ${interval.days} ${interval.days === 1 ? "día" : "días"}`;
  }

  if (interval.hours && interval.hours > 0) {
    return `hace ${interval.hours} ${interval.hours === 1 ? "hora" : "horas"}`;
  }

  if (interval.minutes && interval.minutes > 0) {
    return `hace ${interval.minutes} ${interval.minutes === 1 ? "minuto" : "minutos"}`;
  }

  return "hace unos segundos";
};
