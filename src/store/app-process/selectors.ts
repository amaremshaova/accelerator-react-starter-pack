import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import { Guitar} from '../../types/guitar';
import { ProductsInCart } from '../../types/cart';

export const getResponseStatus = (state: State): number => state[NameSpace.App]?.responseStatus;
export const getProduct = (state: State): Guitar | undefined => state[NameSpace.App].activeProduct;
export const getProductsInCart = (state: State): ProductsInCart[] => state[NameSpace.App].productsInCart;
export const getDiscount = (state: State): number => state[NameSpace.App].discount;
