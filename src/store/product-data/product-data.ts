import {createReducer} from '@reduxjs/toolkit';
import { ProductData } from '../../types/state';

import {
  loadCommentsCount,
  loadMinMaxPrice,
  checkingLoadData,
  loadComments,
  loadLikeGuitars,
  loadGuitarsCount,
  loadPageGuitars} from '../actions';

const initialState: ProductData = {
  products: [],
  likeProducts: [],
  productsCount: 0,
  minPrice: null,
  maxPrice: null,
  commentsCount: [],
  isLoadData: false,
  isLoadComments: false,
  comments: [],
};

const productData = createReducer(initialState, (builder) => {
  builder
    .addCase(checkingLoadData, (state, action) => {
      state.isLoadData = action.payload;
    })
    .addCase(loadMinMaxPrice,  (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      state.productsCount = action.payload;
    })
    .addCase(loadPageGuitars, (state, action) => {
      state.products = action.payload;
    })
    .addCase(loadLikeGuitars, (state, action) => {
      state.likeProducts = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadCommentsCount, (state, action) => {
      const {id, count} = action.payload;

      const index = state.commentsCount.findIndex((commentsCount) => commentsCount.id === id);
      if (index !== -1) {
        const array = state.commentsCount;
        array[index].count = count;
        state.commentsCount = array;
      }
      else{
        state.commentsCount = [...state.commentsCount, {id : id, count : count}];
      }
    });
});

export {productData};
