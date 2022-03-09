import { guitars } from '../../utils/mocks/guitars';
import { addDiscount, addProductInCart, changeProductsInCartCount, changeStatus, deleteProduct, loadGuitar } from '../actions';
import { appProcess } from './app-process';

describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({ responseStatus: 0,
        activeProduct: undefined,
        productsInCart: [], discount: 0});
  });

  it('should update status', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [{product: guitars[0], count: 1}], discount: 0 };

    expect(appProcess(state, changeStatus(200)))
      .toEqual({responseStatus : 200, activeProduct: guitars[0], productsInCart: [{product: guitars[0], count: 1}], discount: 0});
  });


  it('should update discount', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [{product: guitars[0], count: 1}],
      discount: 0 };

    expect(appProcess(state, addDiscount(30)))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [{product: guitars[0], count: 1}],
        discount: 30 });
  });

  it('should update products in cart', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [],
      discount: 0 };

    expect(appProcess(state, addProductInCart(guitars[0])))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [{product: guitars[0], count: 1}],
        discount: 0 });
  });

  it('should increase count products in cart', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [{product: guitars[0], count: 1}],
      discount: 0 };

    expect(appProcess(state, addProductInCart(guitars[0])))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [{product: guitars[0], count: 2}],
        discount: 0 });
  });

  it('should update count products in cart', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [{product: guitars[0], count: 1}],
      discount: 0 };

    expect(appProcess(state, changeProductsInCartCount({product: guitars[0], count: 3})))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [{product: guitars[0], count: 3}],
        discount: 0 });
  });

  it('should delete product from cart', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [{product: guitars[0], count: 1}],
      discount: 0 };

    expect(appProcess(state, deleteProduct(guitars[0].id)))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [],
        discount: 0 });
  });

  it('should update guitar by load guitar', () => {
    const state = {responseStatus: 0,
      activeProduct: guitars[0],
      productsInCart: [],
      discount: 0};
    expect(appProcess(state, loadGuitar(guitars[0])))
      .toEqual({responseStatus: 0,
        activeProduct: guitars[0],
        productsInCart: [],
        discount: 0});
  });

});
