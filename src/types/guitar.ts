import { GuitarType } from '../components/filters/filters';

export type Guitar = {
  id : number,
  name: string,
  vendorCode: string,
  type: GuitarType,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number
}

