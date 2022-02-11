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
import ModalReview from './modal-review';

const history = createMemoryHistory();
const setOpenModalSuccessReview = jest.fn();
const setOpenModalReview = jest.fn();

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
            <ModalReview
              product = {guitars[0]}
              onSetOpenModalReview = {setOpenModalReview}
              onSetOpenModalSuccessReview = {setOpenModalSuccessReview}
            />
          }
        />
      </Routes>
    </Router>
  </Provider>);

describe('Component: ModalReview', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });

  it('should close modal', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    userEvent.click(screen.getByTestId('button-close'));
    expect(setOpenModalReview).toBeCalled();

    userEvent.click(screen.getByTestId('modal__overlay'));
    expect(setOpenModalReview).toBeCalled();

    fireEvent.keyPress(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27});
    expect(setOpenModalReview).toBeCalled();

  });

  it('should show input data', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    userEvent.type(screen.getByTestId('name'), 'Имя');
    expect(screen.getByDisplayValue(/Имя/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('advantages'), 'Достоинства');
    expect(screen.getByDisplayValue(/Достоинства/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('disadvantages'), 'Недостатки');
    expect(screen.getByDisplayValue(/Недостатки/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('comments'), 'Комментарий');
    expect(screen.getByDisplayValue(/Комментарий/i)).toBeInTheDocument();

  });

});
