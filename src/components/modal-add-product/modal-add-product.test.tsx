import {fireEvent, render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { commentsCountArray } from '../../utils/mocks/comments';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { GuitarTypeRU } from '../filters/filters';
import ModalAddProduct from './modal-add-product';

const history = createMemoryHistory();
const setOpenModalAdd = jest.fn();
const setOpenModalSuccessAdd = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: guitarsCount,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
});

const product = guitars[0];

const fakeApp = () => (
  <Provider store={store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={AppRoute.Cart}
          element={
            <ModalAddProduct
              product = {product}
              onSetOpenModalAdd = {setOpenModalAdd}
              onSetOpenModalSuccessAdd = {setOpenModalSuccessAdd}
            />
          }
        />
      </Routes>
    </Router>
  </Provider>);

describe('Component: ModalAddProduct', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Cart);
    render(fakeApp());

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText(product.name, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(GuitarTypeRU[product.type], {exact: false})).toBeInTheDocument();
    expect(screen.getByText(`${product.stringCount} струнная`, {exact: false})).toBeInTheDocument();
  });

  it('should close modal', async () => {

    history.push(AppRoute.Cart);
    render(fakeApp());

    userEvent.click(screen.getByTestId('button-close'));
    expect(setOpenModalAdd).toBeCalled();

    userEvent.click(screen.getByTestId('modal__overlay'));
    expect(setOpenModalAdd).toBeCalled();

    userEvent.click(screen.getByText('Добавить в корзину'));
    expect(setOpenModalAdd).toBeCalled();
    expect(setOpenModalSuccessAdd).toBeCalled();

    fireEvent.keyPress(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27});
    expect(setOpenModalAdd).toBeCalled();

  });

});
