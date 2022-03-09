import {ActionType} from '../types/actions';
import { Guitar } from '../types/guitar';
import {createAction} from '@reduxjs/toolkit';
import { ProductsInCart } from '../types/cart';
import { Comment } from '../types/comment';

export const loadPageGuitars = createAction(
  ActionType.LoadPageGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (count: number) => ({
    payload: count,
  }),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const loadLikeGuitars = createAction(
  ActionType.LoadLikeGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comment[]) => ({
    payload: comments,
  }),
);


export const loadCommentsCount = createAction(
  ActionType.LoadCommentsCount,
  (id: number, count: number) => ({
    payload: {id, count},
  }),
);

export const loadMinMaxPrice = createAction(
  ActionType.LoadMinMaxPrice,
  (minPrice: number, maxPrice: number) => ({
    payload: {minPrice, maxPrice},
  }),
);

export const checkingLoadData = createAction(
  ActionType.CheckingLoadData,
  (isLoad: boolean) => ({
    payload: isLoad,
  }),
);

export const changeStatus = createAction(
  ActionType.ChangeStatus,
  (status: number) => ({
    payload: {status},
  }),
);

export const addProductInCart = createAction(
  ActionType.AddProductInCart,
  (product: Guitar) => ({
    payload: {product},
  }),
);

export const changeProductsInCartCount = createAction(
  ActionType.ChangeProductsInCartCount,
  (productItem: ProductsInCart) => ({
    payload: productItem,
  }),
);

export const deleteProduct = createAction(
  ActionType.DeleteProduct,
  (id : number) => ({
    payload: id,
  }),
);

export const addDiscount = createAction(
  ActionType.AddDiscount,
  (discount : number) => ({
    payload: discount,
  }),
);
