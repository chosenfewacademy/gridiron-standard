/** Registry and baseline name key. Punctuation and accents do not separate the same player. */
export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function nameSlug(value: string): string {
  return normalizeName(value).replace(/ /g, "_");
}
