export const createClassNameByObject = (objectClasses) => {
  return Object
    .entries(objectClasses)
    .reduce((acc, [key, value]) => {
      return acc + (value ? `${key} ` : '');
    }, '')
    .trim();
}