import { DAYS_OF_WEEK, MONTHS } from "@/constants/date-time";
import { TFunctionNonStrict } from "i18next";

export function isToday(date: Date): boolean {
  const now: Date = new Date();
  if (
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  )
    return true;
  return false;
}

export function formatDate(
  t: TFunctionNonStrict<"translation", undefined>,
  date: Date,
  full: boolean = false
): string {
  const daysOfWeek: string[] = DAYS_OF_WEEK;
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();
  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const getDayOfWeek: string = t(`calendar.week.short.${dayOfWeek}`);
  const getMonth: string = t(
    `calendar.month.long.${MONTHS[month]}`
  ).toLowerCase();
  const dayPrefix: string = isToday(date) ? t("calendar.today") : getDayOfWeek;
  const monthPrefix: string = `${day} ${t("calendar.of")} ${getMonth} ${t(
    "calendar.of"
  )} ${year}`;
  return full ? `${dayPrefix}, ${monthPrefix}` : `${day} - ${dayPrefix}`;
}
