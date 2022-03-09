import {combineReducers} from 'redux';
import { appProcess } from './app-process/app-process';
import { productData } from './product-data/product-data';

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: productData,
  [NameSpace.App]: appProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
