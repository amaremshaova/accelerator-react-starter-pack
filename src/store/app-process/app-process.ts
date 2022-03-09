import { createReducer } from '@reduxjs/toolkit';
import { AppProcess} from '../../types/state';
import { addDiscount,  addProductInCart,  changeProductsInCartCount, changeStatus, deleteProduct, loadGuitar} from '../actions';


const initialState: AppProcess = {
  responseStatus: 0,
  activeProduct: undefined,
  productsInCart: [],
  discount: 0,
};


const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeStatus, (state, action) => {
      const {status} = action.payload;
      state.responseStatus = status;
    })
    .addCase(loadGuitar, (state, action) => {
      state.activeProduct = action.payload;
    })
    .addCase(addProductInCart, (state, action) => {
      const activeProduct = action.payload.product;

      const index = state.productsInCart.findIndex((productItem) => productItem.product.id === activeProduct.id);
      if (index !== -1) {
        const array = state.productsInCart;
        array[index].count = array[index].count + 1;
        state.productsInCart = array;
      }
      else{
        state.productsInCart = [...state.productsInCart, {product : activeProduct, count : 1}];
      }
    })
    .addCase(changeProductsInCartCount, (state, action) => {
      const {product, count} = action.payload;
      const index = state.productsInCart.findIndex((productItem) => productItem.product.id === product.id);
      const array = state.productsInCart;
      array[index].count = count;
      state.productsInCart = array;
    })
    .addCase(deleteProduct, (state, action) => {
      const id = action.payload;
      state.productsInCart = state.productsInCart.filter((item) => item.product.id !== id);
    })
    .addCase(addDiscount,(state, action) => {
      state.discount = action.payload;
    });
});

export {appProcess};
