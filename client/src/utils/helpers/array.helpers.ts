export const parseStringToArray = (
  value: string,
  delimiter: string = ";"
): string[] =>
  value
    ? value
        .split(delimiter)
        .map((item) => item.trim())
        .filter((item) => item)
    : [];
