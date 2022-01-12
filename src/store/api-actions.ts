import {ThunkActionResult} from '../types/actions';
import { loadGuitar, loadLikeGuitars, loadGuitarsCount, loadCommentsCount, loadPageGuitars, loadMinMaxPrice} from './actions';
import { Comment, Guitar } from '../types/guitar';
import { ApiPath } from '../const';

type GuitarsActionProps = {
  name: string | null,
  order: string | null,
  start: number | null,
  end: number | null,
  min: number | null,
  max: number | null,
  types: string[],
  strings: number[],
}

export const fetchCommentsCountAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Comment[]>(ApiPath.Guitars+String(id)+ApiPath.Comments);
    dispatch(loadCommentsCount(id, data.length));
  };


export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Guitar>(ApiPath.Guitars+String(id));
    dispatch(loadGuitar(data));
  };

export const fetchLikeGuitarsAction = (likeString:string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Guitar[]>(`${ApiPath.Guitars}?name_like=${likeString}`);
    dispatch(loadLikeGuitars(data));
  };


export const fetchGuitarsAction = (props: GuitarsActionProps): ThunkActionResult =>
  async (dispatch, _getState, api) => {

    const {name, order, start, end, types, strings} = props;
    let {min, max} = props;

    if ((min !== null && max !== null) && (min > max)){
      [min,max] = [max,min];
    }

    let typeFilter = types.length !== 0 ? types.map((item) => `type=${item}`).join('&') : '';
    typeFilter = typeFilter !== '' ? `&${typeFilter}` : '';

    let priceFilter = (min !== 0) && (max !== 0) ? `price_gte=${min}&price_lte=${max}` : '';
    priceFilter = priceFilter !== '' ? `&${priceFilter}` : '';

    let stringsCountFilter = strings.length !== 0 ? strings.map((item) => `stringCount=${item}`).join('&') : '';
    stringsCountFilter = stringsCountFilter !== '' ? `&${stringsCountFilter}` : '';

    const filter = `${  typeFilter  }${stringsCountFilter  }${priceFilter}`;
    const sort = name !== null ? `&_sort=${name}&_order=${order}` : '';
    const limit = start !== null  && end !== null ? `&_start=${start}&_end=${end}` : '';

    const dataPage = (await api.get<Guitar[]>(`${ApiPath.Guitars}?${filter}${sort}${limit}`)).data;
    const data = (await api.get<Guitar[]>(`${ApiPath.Guitars}?${filter}${sort}`)).data;

    dispatch(loadPageGuitars(dataPage));
    dispatch(loadGuitarsCount(data));
  };

export const fetchMinMaxAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {

    const data = (await api.get<Guitar[]>(ApiPath.Guitars)).data;
    const minPrice = Math.min.apply(null, data.map((guitar) => guitar.price));
    const maxPrice = Math.max.apply(null, data.map((guitar) => guitar.price));

    dispatch(loadMinMaxPrice(minPrice, maxPrice));
  };

