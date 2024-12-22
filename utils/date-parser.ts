export function formatDate(date: Date): string {
  const daysOfWeek = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} - ${dayOfWeek}`;
}
