// Imports
import { convertToLocaleString } from "../../utils/toLocaleStringConverter";
// Type imports
import { ModelTrim, TrimColor, CurrentModelTrim } from "./types";

interface ItemWithPrice {
  price: number;
}
export function sortByPrice(
  { price: priceA }: ItemWithPrice,
  { price: priceB }: ItemWithPrice
) {
  return priceA - priceB;
}

export function getUpdatedTrim(
  currentTrim: ModelTrim,
  color?: TrimColor | string
): CurrentModelTrim {
  let totalLocalPrice: string;
  let totalPrice: number;
  let colorName: string;
  let currentColor;
  currentTrim.colors.sort(sortByPrice);
  if (color) {
    if (typeof color === "string") {
      colorName = color;
      currentColor = {};
      totalPrice = currentTrim.price;
    } else {
      colorName = color.name;
      currentColor = color;
      totalPrice = currentTrim.price + color.price;
    }
  } else {
    currentColor = currentTrim.colors[0];
    colorName = currentColor.name;
    totalPrice = currentTrim.price + currentColor.price;
  }
  totalLocalPrice = convertToLocaleString(totalPrice, "da-dk");
  return {
    ...currentTrim,
    color: currentColor,
    colorName,
    totalLocalPrice,
  };
}
