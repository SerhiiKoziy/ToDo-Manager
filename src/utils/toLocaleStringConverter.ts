interface Currency {
  [key: string]: string;
}
export function convertToLocaleString(
  value: string | number,
  locale: string
): string {
  const currency: Currency = {
    "da-dk": "kr.",
    "en-us": "usd.",
    "uk-ua": "uah.",
  };
  const price = parseInt(value.toString());

  return price
    ? `${price.toLocaleString(locale)} ${currency[locale]}`
    : `${value} ${currency[locale]}`;
}
