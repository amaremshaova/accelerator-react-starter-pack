import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { ApiPath } from '../const';
import { guitars, maxPrice, minPrice } from '../utils/mocks/guitars';
import { addReview, checkingLoadComments, checkingLoadData, loadComments, loadCommentsCount, loadGuitar, loadLikeGuitars, loadMinMaxPrice} from './actions';
import { addReviewAction, fetchCommentsAction, fetchCommentsCountAction, fetchGuitarAction, fetchLikeGuitarsAction, fetchMinMaxAction } from './api-actions';
import { State } from '../types/state';
import { Action} from '@reduxjs/toolkit';
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

  /*it('should dispatch Load_Page_Guitars when GET /guitars', async () => {
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
  });*/

  it('should dispatch Load_Comments_Count when GET /guitars/1/comments', async () => {
    const mockComments = comments;
    const id = 1;

    mockAPI
      .onGet(ApiPath.Guitars+String(id)+ApiPath.Comments)
      .reply(200, mockComments);


    const store = mockStore();
    await store.dispatch(fetchCommentsCountAction(id));

    expect(store.getActions()).toEqual([
      checkingLoadData(false),
      loadCommentsCount(id, mockComments.length),
      checkingLoadData(true),
    ]);
  });


  it('should dispatch Load_Comments when GET /guitars/1/comments', async () => {
    const mockComments = comments;
    const id = 1;
    const start = 0;
    const end = 3;

    mockAPI
      .onGet(ApiPath.Guitars+String(id)+ApiPath.Comments)
      .reply(200, mockComments);


    const store = mockStore();
    await store.dispatch(fetchCommentsAction(id, start, end));

    expect(store.getActions()).toEqual([
      checkingLoadComments(false), loadComments(mockComments), loadCommentsCount(id, mockComments.length),
      checkingLoadComments(true),
    ]);
  });

  it('should dispatch Load_Guitar when GET /guitars/1', async () => {
    const mockGuitar = guitars[0];
    const id = 1;

    mockAPI
      .onGet(ApiPath.Guitars+id)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarAction(id));

    expect(store.getActions()).toEqual([
      loadGuitar(mockGuitar),
    ]);
  });

  it('should dispatch Add_Review when POST /guitars/1/comments', async () => {
    const mockComment = comments[0];

    mockAPI
      .onPost(ApiPath.Comments, mockComment)
      .reply(200, mockComment);

    const store = mockStore();
    await store.dispatch(addReviewAction(mockComment));

    expect(store.getActions()).toEqual([
      addReview(200),
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
