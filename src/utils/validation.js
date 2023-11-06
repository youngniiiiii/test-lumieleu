export function emailReg(text) {
  const RegExr =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegExr.test(String(text).toLowerCase());
}

export function shippingPostCodeReg(text) {
  const RegExr = /^\d{5}$/;
  return RegExr.test(text);
}

export function shippingAddressReg(text) {
  const RegExr = /^[가-힣\d\s]{2,100}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function shippingAddressDetailsReg(text) {
  const RegExr = /^[가-힣\d\s]{2,100}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function phoneNumberFirstReg(text) {
  const RegExr = /^(02|0[3-9]{1}[0-9]{1})$/;
  return RegExr.test(String(text).toLowerCase());
}

export function phoneNumberSecondReg(text) {
  const RegExr = /^\d{4,4}$/;
  return RegExr.test(text);
}

export function phoneNumberThirdReg(text) {
  const RegExr = /^\d{4,4}$/;
  return RegExr.test(text);
}

export function landlinePhoneFirstReg(text) {
  const RegExr = /^010$/;
  return RegExr.test(String(text).toLowerCase());
}

export function landlinePhoneSecondReg(text) {
  const RegExr = /^\d{4,4}$/;
  return RegExr.test(text);
}

export function landlinePhoneThirdReg(text) {
  const RegExr = /^\d{4,4}$/;
  return RegExr.test(text);
}

export function pwReg(text) {
  const RegExr = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,25}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function userNameReg(text) {
  const RegExr = /^[가-힣a-zA-Z\s].{1,9}$/;
  return RegExr.test(String(text).toLowerCase());
}

export function CheckNumeric(value) {
  return value.replace(/\D/g, '');
}

export function hasNumber(text) {
  if (typeof text !== 'string') {
    return false;
  }

  const regex = /\d/;
  return regex.test(text);
}

/* 아이디 영문 + 숫자  검증 로직 */
export function engReg(text) {
  const engReg = /^[a-zA-Z0-9]*$/;
  return engReg.test(String(text).toLowerCase());
}
