import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { guitars} from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import ProductCard from './product-card';
import { AnyAction } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const product = guitars[0];


const fakeRender = (store: MockStore<unknown, AnyAction>, setActiveProduct : ()=> void, setOpenModalAdd : () => void) => (
  <Provider store = {store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={AppRoute.Catalog} element={
          <ProductCard product={product}
            onSetActiveProduct = {setActiveProduct}
            onSetOpenModalAdd = {setOpenModalAdd}
          />
        }
        />
        <Route path={AppRoute.Cart} element={
          <>Корзина</>
        }
        />
      </Routes>
    </Router>
  </Provider>
);


describe('Component: ProductCard', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog);

    const store = mockStore({
      DATA: {
        commentsCount: commentsCountArray,

      },
      APP: {
        productsInCart: [{product: guitars[1], count: 1}],
      },
    });

    const setActiveProduct = jest.fn();
    const setOpenModalAdd = jest.fn();


    render(fakeRender(store, setActiveProduct, setOpenModalAdd));

    expect(screen.getByText(commentsCountArray[0].count)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();

    userEvent.click(screen.getByText('Купить'));
    expect(setOpenModalAdd).toBeCalled();
    expect(setActiveProduct).toBeCalled();

    expect(await screen.findAllByTestId('100-icon').then((data) => data.length)).toBe(3);
    expect(await screen.findAllByTestId('50-icon').then((data) => data.length)).toBe(1);
    expect(await screen.findAllByTestId('0-icon').then((data) => data.length)).toBe(1);
  });

  it('should show cart page', async () => {

    const store = mockStore({
      APP: {
        productsInCart: [{product: guitars[0], count: 1}],
      },
      DATA: {
        commentsCount: commentsCountArray,

      },
    });

    const setActiveProduct = jest.fn();
    const setOpenModalAdd = jest.fn();

    render(fakeRender(store, setActiveProduct, setOpenModalAdd));

    expect(screen.getByText('В корзине')).toBeInTheDocument();
    userEvent.click(screen.getByText('В корзине'));
    render(fakeRender(store, setActiveProduct, setOpenModalAdd));
    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });

});
