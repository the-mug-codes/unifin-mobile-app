export function moneyParser(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(amount);
}
