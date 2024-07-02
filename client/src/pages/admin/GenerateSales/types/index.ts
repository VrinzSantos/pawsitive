interface Product {
  name: string;
}

export interface dataItemTypes {
  totalAmount: number;
  date: string;
  productName: Product[];
}

export interface SalesDataTypes {
  success: boolean;
  data: dataItemTypes[];
}

export interface InventoryProductTypes {
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  stocksLeft: number;
  stocksOut?: number;
}

export interface InventoryDataTypes {
  data: InventoryProductTypes[];
}

export interface ClientDataTypes {
  fullName: string;
  address: string;
  contact: string;
  nameOfPet: string;
  species: string;
  petsBreed: string;
  petsSex: string;
  petsBirthdate: string | Date; // Allow either string or Date
  petsHistory: string[];
  historyDate: string[];
  petsMedication: string[];
  medicationDate: string[];
}

export interface ClientDataResponse {
  data: ClientDataTypes[];
}
