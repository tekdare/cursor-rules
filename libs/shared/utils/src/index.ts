export function formatDate(date: Date): string {
  return date.toISOString();
}

export function isStringEmpty(val?: string | null): boolean {
  return !val || val.trim().length === 0;
}
