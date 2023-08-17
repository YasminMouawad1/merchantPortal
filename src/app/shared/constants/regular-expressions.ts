export const RegularExpression = {

  NUMERIC: '[+-]?([0-9]*[.])?[0-9]+',
  ENGLISH_CHARACTERS: /^[a-zA-Z ]*$/,
  ARABIC_CHARACTERS: /^[\u0621-\u064A\u0660-\u0669 ]+$/,
  SAUDI_PHONE: /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
  EMAIL: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",

  RETURN_DIGIT_AFTER_ST: /\/st\d\//,
  RETURN_NAME_AFTER_STEP_ROUTE: /(st\d\/)\w+/,

};
