export function nonEmptyStrings(values: string[] | undefined): string[] | undefined {
  const filtered = values?.filter((value) => value.trim().length > 0);
  const hasNonEmptyValues = filtered !== undefined && filtered.length > 0;
  return hasNonEmptyValues ? filtered : undefined;
}

export function sortByOrder<T extends { sortOrder?: number }>(items: T[] | undefined): T[] | undefined {
  return items
    ?.slice()
    .sort(
      (first, second) =>
        (first.sortOrder ?? Number.MAX_SAFE_INTEGER) - (second.sortOrder ?? Number.MAX_SAFE_INTEGER),
    );
}
