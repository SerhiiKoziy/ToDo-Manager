// Imports

interface ItemWithPrice {
  price: number;
}
export function sortByPrice(
  { price: priceA }: ItemWithPrice,
  { price: priceB }: ItemWithPrice
) {
  return priceA - priceB;
}
