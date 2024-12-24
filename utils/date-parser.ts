import { DAYS_OF_WEEK, MONTHS } from "@/constants/date-time";
import { getLocales } from "expo-localization";

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

export function formatDate(date: Date, full: boolean = false): string {
  let of: string;
  let today: string;
  const lang: string = getLocales()[0].languageCode || "en";
  const daysOfWeek: string[] = DAYS_OF_WEEK[lang];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];
  switch (lang) {
    case "pt":
      of = "de";
      today = "hoje";
      break;
    default:
      of = "of";
      today = "today";
      break;
  }
  return full
    ? `${isToday(date) ? today : dayOfWeek}, ${day} ${of} ${
        getMonths()[month]
      } ${of} ${year}`
    : `${day} - ${isToday(date) ? today : dayOfWeek}`;
}

export function getMonths(): string[] {
  return MONTHS[getLocales()[0].languageCode || "en"];
}
