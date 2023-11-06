export function currency(price, symbol = '$') {
  return `${symbol}${price}`;
}

export function currencyKR(price) {
  return `${price}원`;
}