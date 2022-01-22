import {ThunkActionResult} from '../types/actions';
import { loadLikeGuitars, loadGuitarsCount, loadCommentsCount, loadPageGuitars, loadMinMaxPrice, checkingLoadData} from './actions';
import { Comment, Guitar } from '../types/guitar';
import { ApiPath } from '../const';
import {toast} from 'react-toastify';

type GuitarsActionProps = {
  sortType: string | null,
  order: string | null,
  start: number | null ,
  end: number | null ,
  min: number | null,
  max: number | null,
  types: string[],
  strings: number[],
}

const AUTH_FAIL_MESSAGE = 'Сервер не загружен';

export const fetchCommentsCountAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Comment[]>(ApiPath.Guitars+String(id)+ApiPath.Comments);
      dispatch(loadCommentsCount(id, data.length));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

  type IndexLikeString = {
    index: number,
    guitar: Guitar
  }

export const fetchLikeGuitarsAction = (likeString:string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Guitar[]>(`${ApiPath.Guitars}?name_like=${likeString}`);
      const indexLikeString = data.map((item) => ({index: item.name.toLowerCase().search(likeString.toLowerCase()), guitar: item}));

      const sortIndex = (a: IndexLikeString, b: IndexLikeString) => a.index - b.index;
      dispatch(loadLikeGuitars(indexLikeString.sort(sortIndex).map((item) => item.guitar)));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
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

    const {start, end} = props;
    dispatch(checkingLoadData(false));

    try {
      const {filter, sort} = getApiFilterSortLimit(props);
      const data = (await api.get<Guitar[]>(`${ApiPath.Guitars}?${filter}${sort}`)).data;

      if (start === null || end === null){
        dispatch(loadPageGuitars(data));
      }
      else{
        dispatch(loadPageGuitars(data.slice(start, end)));
      }

      dispatch(loadGuitarsCount(data.length));
      dispatch(checkingLoadData(true));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
      dispatch(loadPageGuitars([]));
    }

  };

export const fetchMinMaxAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {  try {
    const data = (await api.get<Guitar[]>(ApiPath.Guitars)).data;
    const minPrice = Math.min.apply(null, data.map((guitar) => guitar.price));
    const maxPrice = Math.max.apply(null, data.map((guitar) => guitar.price));

    dispatch(loadMinMaxPrice(minPrice, maxPrice));
  } catch {
    toast.info(AUTH_FAIL_MESSAGE);
  }};

