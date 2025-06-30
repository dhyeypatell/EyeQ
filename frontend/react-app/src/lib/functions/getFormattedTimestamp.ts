export function getFormattedTimestamp(): string {
  return new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });
}
