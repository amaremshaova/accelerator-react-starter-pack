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

export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}

export type CommentPost = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage:  string,
  comment:  string,
  rating: number,
}


enum Coupons{
  Leight = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}


export type CouponPost = {
  coupon: Coupons
}

export type OrderPost = {
  guitarsIds: number[],
  coupon: Coupons
}
