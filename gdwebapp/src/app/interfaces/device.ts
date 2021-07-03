import {Category} from "./category";

export interface Device {
  id: number;
  color: string;
  partNumber: number;
  category: Category[];
}
