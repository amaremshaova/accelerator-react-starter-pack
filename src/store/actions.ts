import {ActionType} from '../types/actions';
import { Guitar } from '../types/guitar';
import {createAction} from '@reduxjs/toolkit';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

