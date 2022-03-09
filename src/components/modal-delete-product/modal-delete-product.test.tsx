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
import ModalDeleteProduct from './modal-delete-product';
import { GuitarTypeRU } from '../filters/filters';

const history = createMemoryHistory();
const setOpenModalDelete = jest.fn();

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
            <ModalDeleteProduct
              product = {product}
              onSetOpenModalDelete = {setOpenModalDelete}
            />
          }
        />
        <Route path={AppRoute.CatalogStartPage}
          element={
            <>Каталог</>
          }
        />
      </Routes>
    </Router>
  </Provider>);

describe('Component: ModalDeleteProduct', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Cart);
    render(fakeApp());

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText(product.name, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(GuitarTypeRU[product.type], {exact: false})).toBeInTheDocument();
    expect(screen.getByText(`${product.stringCount} струнная`, {exact: false})).toBeInTheDocument();
  });

  it('should close modal', async () => {

    history.push(AppRoute.Cart);
    render(fakeApp());

    userEvent.click(screen.getByTestId('button-close'));
    expect(setOpenModalDelete).toBeCalled();

    userEvent.click(screen.getByTestId('modal__overlay'));
    expect(setOpenModalDelete).toBeCalled();

    userEvent.click(screen.getByText('Продолжить покупки'));
    expect(setOpenModalDelete).toBeCalled();

    userEvent.click(screen.getByText('Удалить товар'));
    expect(setOpenModalDelete).toBeCalled();

    fireEvent.keyPress(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27});
    expect(setOpenModalDelete).toBeCalled();

  });

  it('should show catalog page', async () => {

    history.push(AppRoute.Cart);
    render(fakeApp());

    userEvent.click(screen.getByText('Продолжить покупки'));
    render(fakeApp());
    expect(screen.getByText('Каталог', {exact: false})).toBeInTheDocument();
  });
});
