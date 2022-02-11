import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';


export enum ActionType {
  LoadGuitar = 'data/loadGuitar',
  LoadPageGuitars = 'data/loadPageGuitars',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadLikeGuitars = 'data/loadLikeGuitars',
  LoadComments = 'data/loadComments',
  LoadCommentsCount = 'data/loadCommentsCount',
  LoadMinMaxPrice = 'data/loadMinMaxPrice',
  CheckingLoadData = 'data/checkingLoadData',
  CheckingLoadComments = 'data/checkingLoadComments',
  AddReview = 'data/addReview',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
