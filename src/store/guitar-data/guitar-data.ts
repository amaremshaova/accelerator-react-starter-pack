import {createReducer} from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';

import { loadGuitar, loadGuitarsCount, loadPageGuitars, loadLikeGuitars, loadCommentsCount, loadMinMaxPrice} from '../actions';


const initialState: GuitarData = {
  guitars: [],
  likeGuitars: [],
  activeGuitar: undefined,
  guitarsCount: 0,
  minPrice: null,
  maxPrice: null,
  commentsCount: [],
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadMinMaxPrice,  (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      state.guitarsCount = action.payload.length;
    })
    .addCase(loadPageGuitars, (state, action) => {
      state.guitars = action.payload;
      state.guitarsCount = action.payload.length;
    })
    .addCase(loadLikeGuitars, (state, action) => {
      state.likeGuitars = action.payload;
    })
    .addCase(loadCommentsCount, (state, action) => {
      const {id, count} = action.payload;

      const item = state.commentsCount.find((commentsCount) => commentsCount.id === id);
      if (item) {
        item.count= count;
      }
      else{
        state.commentsCount = [...state.commentsCount, {id : id, count : count}];
      }

    })
    .addCase(loadGuitar, (state, action) => {
      state.activeGuitar = action.payload;
    });
});

export {guitarData};
