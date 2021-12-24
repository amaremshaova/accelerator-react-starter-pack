import {combineReducers} from 'redux';
import { guitarData } from './guitar-data/guitar-data';

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
});

export type RootState = ReturnType<typeof rootReducer>;
