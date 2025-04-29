export function addNamedParametersToQuery(
  query: string,
  params: any[],
  namedParams: Record<string, unknown>,
): { query: string; params: any[] } {
  if (Object.keys(namedParams).length > 0) {
    query += Object.keys(namedParams)
      .map((key, index) => `, ${key} => $${params.length + index + 1}`)
      .join('');

    params.push(...Object.values(namedParams));
  }

  query += ')';

  return { query, params };
}
