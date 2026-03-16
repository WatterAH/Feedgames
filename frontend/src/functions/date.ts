import { intervalToDuration } from "date-fns";

export const calculateDate = (date: string, reduce?: boolean): string => {
  const todayISO = getISODate();
  const created = formatDate(date);

  if (reduce) return created.day + "/" + created.month + "/" + created.year;

  const diffDays = daysAgo(date, todayISO);

  if (diffDays == 0) {
    const diffMs = minutesAgo(date, todayISO);
    if (diffMs < 60) {
      return diffMs <= 0 ? "ahora" : `${diffMs}min`;
    } else {
      const diffHs = hoursAgo(date, todayISO);
      return `${diffHs}h`;
    }
  }

  if (diffDays > 0 && diffDays < 7) {
    return `${diffDays}d`;
  } else if (diffDays >= 7 && diffDays < 21) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w`;
  }

  return created.day + "/" + created.month + "/" + created.year;
};

const minutesAgo = (date: string, todayISO: string): number => {
  const diffMs = Date.parse(todayISO) - Date.parse(date);
  return Math.floor(diffMs / (1000 * 60));
};

const hoursAgo = (date: string, todayISO: string): number => {
  const diffMs = Date.parse(todayISO) - Date.parse(date);
  return Math.floor(diffMs / (1000 * 60 * 60));
};

const daysAgo = (date: string, todayISO: string): number => {
  const diffMs = Date.parse(todayISO) - Date.parse(date);
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: string) => {
  const year = date.slice(2, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return { year, month, day };
};

export const getISODate = () => {
  const createdTime = Date.now();
  const today = new Date(createdTime);
  return today.toISOString().split(".")[0].replace("Z", "");
};

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

  if (interval.years && interval.years > 0) {
    return mode === "short"
      ? `${interval.years}a`
      : `hace ${interval.years} ${interval.years === 1 ? "año" : "años"}`;
  }

  if (interval.months && interval.months > 0) {
    return mode === "short"
      ? `${interval.months}mes`
      : `hace ${interval.months} ${interval.months === 1 ? "mes" : "meses"}`;
  }

  if (interval.days && interval.days >= 7) {
    const weeks = Math.floor(interval.days / 7);
    return mode === "short"
      ? `${weeks}sem`
      : `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }

  if (interval.days && interval.days > 0) {
    return mode === "short"
      ? `${interval.days}d`
      : `hace ${interval.days} ${interval.days === 1 ? "día" : "días"}`;
  }

  if (interval.hours && interval.hours > 0) {
    return mode === "short"
      ? `${interval.hours}h`
      : `hace ${interval.hours} ${interval.hours === 1 ? "hora" : "horas"}`;
  }

  if (interval.minutes && interval.minutes > 0) {
    return mode === "short"
      ? `${interval.minutes}m`
      : `hace ${interval.minutes} ${interval.minutes === 1 ? "minuto" : "minutos"}`;
  }

  return mode === "short" ? "ahora" : "hace unos segundos";
};
