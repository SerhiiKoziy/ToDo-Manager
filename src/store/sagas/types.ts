export interface Model {
  code: string;
  name: string;
  priceFrom: string;
  imageUrl: string;
}

export interface TrimColor {
  name: string;
  iconUrl: string;
  imageUrl: string;
  price: number;
}

export interface ModelTrim {
  name: string;
  price: number;
  colors: TrimColor[];
}

export interface CurrentModelTrim {
  name: string;
  color: TrimColor | { [key: string]: string };
  price: number;
  totalLocalPrice: string;
  colorName: string;
  colors: TrimColor[];
}

export interface CurrentModel {
  code: string;
  name: string;
  trims: ModelTrim[];
}

export interface CurrentModelWithSelectedTrim extends CurrentModel {
  currentTrim: CurrentModelTrim;
}
