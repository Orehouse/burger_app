export const checkValidity = (value, rules) => {
  let isValid = false;

  if (rules.required) {
    isValid = value.trim() !== "";
  }

  if (rules.minLength) {
    isValid &= value.trim().length >= rules.minLength;
  }

  if (rules.maxLength) {
    isValid &= value.trim().length <= rules.maxLength;
  }

  if (rules.isEmail) {
    isValid &= new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(value);
  }

  return !!isValid;
};
