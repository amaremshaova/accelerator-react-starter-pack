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
import ModalSuccessAdd from './modal-success-add';

const history = createMemoryHistory();
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

const fakeApp = () => (
  <Provider store={store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={`${AppRoute.Catalog}:id`}
          element={
            <ModalSuccessAdd
              onSetOpenModalSuccessAdd = {setOpenModalSuccessAdd}
            />
          }
        />
        <Route path={AppRoute.Cart} element={<>Корзина</>}/>
      </Routes>
    </Router>
  </Provider>);

describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByTestId('button-close')).toBeInTheDocument();
  });

  it('should close modal', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    userEvent.click(screen.getByTestId('button-close'));
    expect(setOpenModalSuccessAdd).toBeCalled();

    fireEvent.keyPress(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27});
    expect(setOpenModalSuccessAdd).toBeCalled();

    userEvent.click(screen.getByText('Продолжить покупки'));
    expect(setOpenModalSuccessAdd).toBeCalled();

    userEvent.click(screen.getByText('Перейти в корзину'));
    expect(setOpenModalSuccessAdd).toBeCalled();

    userEvent.click(screen.getByTestId('modal__overlay'));
    expect(setOpenModalSuccessAdd).toBeCalled();

  });

  it('should show cart page', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    userEvent.click(screen.getByText('Перейти в корзину'));
    render(fakeApp());
    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });

});
