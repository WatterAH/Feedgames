export const calculateDate = (date: string, reduce?: boolean): string => {
  const todayISO = getISODate();
  const today = formatDate(todayISO);
  const created = formatDate(date);

  if (reduce) return created.day + "/" + created.month + "/" + created.year;

  if (today.month === created.month) {
    if (today.day === created.day) {
      const diffMs = minutesAgo(date, todayISO);
      if (diffMs < 60) {
        return diffMs <= 0 ? "ahora" : `${diffMs}min`;
      } else {
        const diffHs = hoursAgo(date, todayISO);
        return `${diffHs}h`;
      }
    } else {
      const diffDays = daysAgo(date, todayISO);
      return diffDays == 0 ? "1d" : `${diffDays}d`;
    }
  } else {
    return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(2, 4)}`;
  }
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
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  return expirationDate;
};
