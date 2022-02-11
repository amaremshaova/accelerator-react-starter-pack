import {createReducer} from '@reduxjs/toolkit';
import { GuitarType } from '../../components/filters/filters';
import { GuitarData } from '../../types/state';

import {loadGuitarsCount,
  loadPageGuitars,
  loadLikeGuitars,
  loadCommentsCount,
  loadMinMaxPrice,
  checkingLoadData,
  loadComments,
  loadGuitar,
  checkingLoadComments} from '../actions';


export const initialActiveGuitar = {
  id : 0,
  name: '',
  vendorCode: '',
  type: GuitarType.Acoustic,
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
};


const initialState: GuitarData = {
  guitars: [],
  activeGuitar: initialActiveGuitar,
  likeGuitars: [],
  guitarsCount: 0,
  minPrice: null,
  maxPrice: null,
  commentsCount: [],
  isLoadData: false,
  isLoadComments: false,
  comments: [],
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(checkingLoadData, (state, action) => {
      state.isLoadData = action.payload;
    })
    .addCase(checkingLoadComments, (state, action) => {
      state.isLoadComments = action.payload;
    })
    .addCase(loadMinMaxPrice,  (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      state.guitarsCount = action.payload;
    })
    .addCase(loadGuitar, (state, action) => {
      state.activeGuitar = action.payload;
    })
    .addCase(loadPageGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadLikeGuitars, (state, action) => {
      state.likeGuitars = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadCommentsCount, (state, action) => {
      const {id, count} = action.payload;

      const item = state.commentsCount.find((commentsCount) => commentsCount.id === id);
      if (item) {
        item.count = count;
      }
      else{
        state.commentsCount = [...state.commentsCount, {id : id, count : count}];
      }

    });
});

export {guitarData};
