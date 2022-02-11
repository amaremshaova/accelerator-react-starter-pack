import {ActionType} from '../types/actions';
import { Comment, Guitar } from '../types/guitar';
import {createAction} from '@reduxjs/toolkit';

export const loadPageGuitars = createAction(
  ActionType.LoadPageGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (count: number) => ({
    payload: count,
  }),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const loadLikeGuitars = createAction(
  ActionType.LoadLikeGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comment[]) => ({
    payload: comments,
  }),
);


export const loadCommentsCount = createAction(
  ActionType.LoadCommentsCount,
  (id: number, count: number) => ({
    payload: {id, count},
  }),
);

export const loadMinMaxPrice = createAction(
  ActionType.LoadMinMaxPrice,
  (minPrice: number, maxPrice: number) => ({
    payload: {minPrice, maxPrice},
  }),
);

export const checkingLoadData = createAction(
  ActionType.CheckingLoadData,
  (isLoad: boolean) => ({
    payload: isLoad,
  }),
);

export const checkingLoadComments = createAction(
  ActionType.CheckingLoadComments,
  (isLoad: boolean) => ({
    payload: isLoad,
  }),
);

export const addReview = createAction(
  ActionType.AddReview,
  (status: number) => ({
    payload: {status},
  }),
);

