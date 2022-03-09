import { checkingLoadData, loadComments, loadCommentsCount, loadGuitarsCount, loadLikeGuitars, loadMinMaxPrice, loadPageGuitars } from '../actions';
import { productData} from './product-data';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { comments, commentsCount } from '../../utils/mocks/comments';

describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(productData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({  products: [],
        likeProducts: [],
        activeProduct: undefined,
        productsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        isLoadComments: false,
        comments: [],
      });
  });

  it('should update all guitars by load all guitars', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};

    expect(productData(state, loadPageGuitars(guitars)))
      .toEqual({products: guitars,
        likeProducts: [],
        activeProduct: guitars[0],
        productsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update min-max price by load min-max price', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state, loadMinMaxPrice(minPrice, maxPrice)))
      .toEqual({products: [],
        likeProducts: [],
        activeProduct: guitars[0],
        productsCount: 0,
        minPrice: minPrice,
        maxPrice: maxPrice,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update similar guitars by load similar guitars', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state, loadLikeGuitars(guitars)))
      .toEqual({products: [],
        likeProducts: guitars,
        activeProduct: guitars[0],
        productsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update guitars count by load guitars count', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state,loadGuitarsCount(guitarsCount)))
      .toEqual({products: [],
        likeProducts: [],
        activeProduct: guitars[0],
        productsCount:  guitarsCount,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update comments count by load comments count', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [{id : 1, count: 2}],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state, loadCommentsCount(1, commentsCount)))
      .toEqual({products: [],
        likeProducts: [],
        activeProduct: guitars[0],
        productsCount:  0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [{id: 1, count: commentsCount}],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });


  it('should update comments by load comments', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[0],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state, loadComments(comments)))
      .toEqual({products: [],
        likeProducts: [],
        activeProduct: guitars[0],
        productsCount:  0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: comments,
        isLoadComments: false});
  });


  it('should update load data', () => {
    const state = {products: [],
      likeProducts: [],
      activeProduct: guitars[1],
      productsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(productData(state, checkingLoadData(true)))
      .toEqual({products: [],
        likeProducts: [],
        activeProduct: guitars[1],
        productsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: true,
        comments: [],
        isLoadComments: false});
  });

});
