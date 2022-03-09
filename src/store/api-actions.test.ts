import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { ApiPath } from '../const';
import { guitars, maxPrice, minPrice } from '../utils/mocks/guitars';
import {addDiscount, changeStatus, loadComments, loadCommentsCount, loadGuitar, loadLikeGuitars, loadMinMaxPrice} from './actions';
import { addCouponAction, addReviewAction, fetchGuitarAction, fetchLikeGuitarsAction, fetchMinMaxAction } from './api-actions';
import { State } from '../types/state';
import { Action} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { comments, guitarComments } from '../utils/mocks/comments';
import { Coupon } from '../types/coupon';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('should dispatch Load_Guitar when GET /guitars/1', async () => {
    const mockGuitarComments = guitarComments[0];
    const id = 1;

    mockAPI
      .onGet(`${ApiPath.Guitars+id}?_embed=comments`)
      .reply(200, mockGuitarComments);

    const store = mockStore();
    await store.dispatch(fetchGuitarAction(id, 0, 3));

    expect(store.getActions()).toEqual([
      loadComments(mockGuitarComments.comments),
      loadCommentsCount(id, mockGuitarComments.comments.length),
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
      changeStatus(200),
    ]);
  });

  it('should dispatch Add_Coupon when POST /coupons', async () => {
    const mockCoupon = {coupon: Coupon.Height};
    const discount = 30;

    mockAPI
      .onPost(ApiPath.Coupons, mockCoupon)
      .reply(200, discount);

    const store = mockStore();
    await store.dispatch(addCouponAction(mockCoupon));

    expect(store.getActions()).toEqual([
      addDiscount(discount),
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
