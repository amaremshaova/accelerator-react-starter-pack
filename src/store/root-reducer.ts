import {combineReducers} from 'redux';
import { appProcess } from './app-process/app-process';
import { guitarData } from './guitar-data/guitar-data';

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.App]: appProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
