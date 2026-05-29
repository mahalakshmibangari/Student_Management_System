export const isString = (val) => /^[A-Za-z ]+$/.test(val);
 
export const isAlphanumeric = (val) => /^[A-Za-z0-9]+$/.test(val);
 
export const isValidCourse = (val) =>
  /^(?=.*[A-Za-z])[A-Za-z0-9 ]+$/.test(val);