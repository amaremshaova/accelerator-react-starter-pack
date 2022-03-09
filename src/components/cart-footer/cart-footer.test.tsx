import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { Provider} from 'react-redux';
import { guitars } from '../../utils/mocks/guitars';
import { AppRoute } from '../../const';
import { Store, AnyAction } from '@reduxjs/toolkit';
import CartFooter from './cart-footer';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeApp = (store: Store<unknown, AnyAction>)=>(
  <Provider store = {store}>
    <Router location={history.location} navigator={history} >
      <CartFooter/>
    </Router>
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {

    history.push(AppRoute.Catalog);
    const productItem = {product: guitars[0], count: 2};
    const discount = 10;

    const store = mockStore({
      APP : {
        productsInCart: [productItem], discount: discount},
    });

    render(fakeApp(store));

    expect(screen.getByText('Введите свой промокод, если он у вас есть.')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText(/35 000/i, {exact: false})).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText(/3 500/i, {exact: false})).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText(/31 500/i, {exact: false})).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
});

