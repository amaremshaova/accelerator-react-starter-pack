import { createReducer } from '@reduxjs/toolkit';
import { AppProcess} from '../../types/state';
import { changeStatus } from '../actions';


const initialState: AppProcess = {
  responseStatus: 0,
};


const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeStatus, (state, action) => {
      const {status} = action.payload;
      state.responseStatus = status;
    });
});

export {appProcess};
