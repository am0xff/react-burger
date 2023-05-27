export const createClassNameByObject = (objectClasses: Record<string, boolean>) => {
  return Object
    .entries(objectClasses)
    .reduce((acc, [key, value]) => {
      return acc + (value ? `${key} ` : '');
    }, '')
    .trim();
}