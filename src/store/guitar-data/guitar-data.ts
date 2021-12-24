import {createReducer} from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';

import { loadGuitar, loadGuitars } from '../actions';


const initialState: GuitarData = {
  guitars: [],
  activeGuitar: undefined,

};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadGuitar, (state, action) => {
      state.activeGuitar = action.payload;
    });
});

export {guitarData};
