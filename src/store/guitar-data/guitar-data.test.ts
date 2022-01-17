import { loadCommentsCount, loadGuitarsCount, loadLikeGuitars, loadMinMaxPrice, loadPageGuitars } from '../actions';
import { guitarData } from './guitar-data';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCount } from '../../utils/mocks/comments';

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({  guitars: [],
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: []});
  });

  it('should update all guitars by load all guitars', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: undefined,
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: []};
    expect(guitarData(state, loadPageGuitars(guitars)))
      .toEqual({guitars,
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: []});
  });

  it('should update min-max price by load min-max price', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: undefined,
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: []};
    expect(guitarData(state, loadMinMaxPrice(minPrice, maxPrice)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: minPrice,
        maxPrice: maxPrice,
        commentsCount: []});
  });

  it('should update similar guitars by load similar guitars', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: undefined,
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: []};
    expect(guitarData(state, loadLikeGuitars(guitars)))
      .toEqual({guitars: [],
        likeGuitars: guitars,
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: []});
  });

  it('should update guitars count by load guitars count', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: undefined,
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: []};
    expect(guitarData(state,loadGuitarsCount(guitarsCount)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: guitarsCount,
        minPrice: null,
        maxPrice: null,
        commentsCount: []});
  });

  it('should update comments count by load comments count', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: undefined,
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [{id : 1, count: 2}]};
    expect(guitarData(state, loadCommentsCount(1, commentsCount)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [{id: 1, count: commentsCount}]});
  });

});

