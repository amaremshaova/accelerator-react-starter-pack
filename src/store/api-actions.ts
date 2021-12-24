import {ThunkActionResult} from '../types/actions';
import { loadGuitar, loadGuitars } from './actions';
import { Guitar } from '../types/guitar';
import { ApiPath } from '../const';


export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(ApiPath.Guitars);
    dispatch(loadGuitars(data));
  };

export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Guitar>(ApiPath+String(id));
    dispatch(loadGuitar(data));
  };

