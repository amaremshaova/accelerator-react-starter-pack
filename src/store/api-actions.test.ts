import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { ApiPath } from '../const';
import { guitars, maxPrice, minPrice } from '../utils/mocks/guitars';
import { loadCommentsCount, loadGuitarsCount, loadLikeGuitars, loadMinMaxPrice, loadPageGuitars } from './actions';
import { fetchCommentsCountAction, fetchGuitarsAction,  fetchLikeGuitarsAction, fetchMinMaxAction } from './api-actions';
import { State } from '../types/state';
import { Action} from '@reduxjs/toolkit';
import { SortOrder, SortType } from '../components/product-list/product-list';
import {createAPI} from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { comments } from '../utils/mocks/comments';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('should dispatch Load_Page_Guitars when GET /guitars', async () => {
    const mockGuitars = guitars;

    const props = {
      sortType: SortType.Price,
      order: SortOrder.Up,
      start: 0,
      end: 9,
      min: 2000,
      max: 5000,
      types: [],
      strings: [4],
    };


    const {
      sortType,
      order,
      min,
      max,
      types,
      strings,
    } = props;

    let typeFilter = types.length !== 0 ? types.map((item) => `type=${item}`).join('&') : '';
    typeFilter = typeFilter !== '' ? `&${typeFilter}` : '';

    let priceFilter = (min !== 0) && (max !== 0) ? `price_gte=${min}&price_lte=${max}` : '';
    priceFilter = priceFilter !== '' ? `&${priceFilter}` : '';

    let stringsCountFilter = strings.length !== 0 ? strings.map((item) => `stringCount=${item}`).join('&') : '';
    stringsCountFilter = stringsCountFilter !== '' ? `&${stringsCountFilter}` : '';

    const filter = `${  typeFilter  }${stringsCountFilter  }${priceFilter}`;
    const sort = sortType !== null ? `&_sort=${sortType}&_order=${order}` : '';

    mockAPI
      .onGet(`${ApiPath.Guitars}?${filter}${sort}`)
      .reply(200, mockGuitars);


    const store = mockStore();
    await store.dispatch(fetchGuitarsAction(props));

    expect(store.getActions()).toEqual([
      loadPageGuitars(mockGuitars), loadGuitarsCount(mockGuitars.length),
    ]);
  });

  it('should dispatch Load_Comments when GET /guitars/1/comments', async () => {
    const mockComments = comments;
    const id = 1;

    mockAPI
      .onGet(ApiPath.Guitars+String(id)+ApiPath.Comments)
      .reply(200, mockComments);


    const store = mockStore();
    await store.dispatch(fetchCommentsCountAction(id));

    expect(store.getActions()).toEqual([
      loadCommentsCount(id, mockComments.length),
    ]);
  });


  it('should dispatch Load_Like_Guitars when GET /guitars/?name_like=', async () => {
    const mockGuitars = guitars;
    const likeString = 'Честер';

    mockAPI
      .onGet(`${ApiPath.Guitars}?name_like=${likeString}`)
      .reply(200, mockGuitars);


    const store = mockStore();
    await store.dispatch(fetchLikeGuitarsAction(likeString));

    expect(store.getActions()).toEqual([
      loadLikeGuitars(mockGuitars),
    ]);
  });

  it('should dispatch Load_Min_Max_Price when GET /guitars', async () => {
    const mockMinPrice = minPrice;
    const mockMaxPrice = maxPrice;
    const mockGuitars = guitars;

    mockAPI
      .onGet(ApiPath.Guitars)
      .reply(200, mockGuitars);


    const store = mockStore();
    await store.dispatch(fetchMinMaxAction());

    expect(store.getActions()).toEqual([
      loadMinMaxPrice(mockMinPrice, mockMaxPrice),
    ]);
  });
});
