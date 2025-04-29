export const toggleArrayItem = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter((el) => el !== item);
  } else {
    return [...array, item];
  }
};

export const checkInProgress = (
  array: (number | string)[],
  id: number | string
) => array.includes(id);
