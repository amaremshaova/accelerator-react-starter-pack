import {ThunkActionResult} from '../types/actions';
import { loadLikeGuitars, loadGuitarsCount, loadCommentsCount, loadPageGuitars, loadMinMaxPrice} from './actions';
import { Comment, Guitar } from '../types/guitar';
import { ApiPath } from '../const';

type GuitarsActionProps = {
  sortType: string | null,
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
    try {
      const {data} = await api.get<Comment[]>(ApiPath.Guitars+String(id)+ApiPath.Comments);
      dispatch(loadCommentsCount(id, data.length));
    } catch {
      dispatch(loadCommentsCount(id, 0));
    }
  };

export const fetchLikeGuitarsAction = (likeString:string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Guitar[]>(`${ApiPath.Guitars}?name_like=${likeString}`);
      dispatch(loadLikeGuitars(data));
    } catch {
      dispatch(loadLikeGuitars([]));
    }
  };

const getApiFilterSortLimit = (props: GuitarsActionProps) => {

  const {min, max, sortType, order, start, end, types, strings} = props;

  let typeFilter = types.length !== 0 ? types.map((item) => `type=${item}`).join('&') : '';
  typeFilter = typeFilter !== '' ? `&${typeFilter}` : '';

  let priceFilter = (Number(min) !== 0) && (Number(max) !== 0) ? `price_gte=${min}&price_lte=${max}` : '';
  priceFilter = priceFilter !== '' ? `&${priceFilter}` : '';

  let stringsCountFilter = strings.length !== 0 ? strings.map((item) => `stringCount=${item}`).join('&') : '';
  stringsCountFilter = stringsCountFilter !== '' ? `&${stringsCountFilter}` : '';

  const filter = `${  typeFilter  }${stringsCountFilter  }${priceFilter}`;
  const sort = sortType !== null ? `&_sort=${sortType}&_order=${order}` : '';
  const limit = start !== null  && end !== null ? `&_start=${start}&_end=${end}` : '';

  return {filter: filter, sort: sort, limit: limit};
};


export const fetchGuitarsAction = (props: GuitarsActionProps): ThunkActionResult =>
  async (dispatch, _getState, api) => {

    try {
      const {filter, sort, limit} = getApiFilterSortLimit(props);
      const dataPage = (await api.get<Guitar[]>(`${ApiPath.Guitars}?${filter}${sort}${limit}`)).data;
      dispatch(loadPageGuitars(dataPage));
    } catch {
      dispatch(loadPageGuitars([]));
    }


  };

export const fetchGuitarsCountAction = (props: GuitarsActionProps): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {filter, sort} = getApiFilterSortLimit(props);
      const data = (await api.get<Guitar[]>(`${ApiPath.Guitars}?${filter}${sort}`)).data;
      dispatch(loadGuitarsCount(data.length));
    } catch {
      dispatch(loadGuitarsCount(0));
    }

  };

export const fetchMinMaxAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {  try {
    const data = (await api.get<Guitar[]>(ApiPath.Guitars)).data;
    const minPrice = Math.min.apply(null, data.map((guitar) => guitar.price));
    const maxPrice = Math.max.apply(null, data.map((guitar) => guitar.price));

    dispatch(loadMinMaxPrice(minPrice, maxPrice));
  } catch {
    dispatch(loadMinMaxPrice(0, 0));
  }


  };

