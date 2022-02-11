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
import ModalSuccessReview from './modal-success-review';

const history = createMemoryHistory();
const setOpenModalSuccessReview = jest.fn();

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
            <ModalSuccessReview
              onSetOpenModalSuccessReview = {setOpenModalSuccessReview}
            />
          }
        />
      </Routes>
    </Router>
  </Provider>);

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByText('К покупкам!')).toBeInTheDocument();
    expect(screen.getByTestId('button-close')).toBeInTheDocument();
  });

  it('should close modal', async () => {

    history.push(AppRoute.Catalog + 1);
    render(fakeApp());

    userEvent.click(screen.getByTestId('button-close'));
    expect(setOpenModalSuccessReview).toBeCalled();

    userEvent.click(screen.getByText('К покупкам!'));
    expect(setOpenModalSuccessReview).toBeCalled();

    userEvent.click(screen.getByTestId('modal__overlay'));
    expect(setOpenModalSuccessReview).toBeCalled();

    fireEvent.keyPress(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27});
    expect(setOpenModalSuccessReview).toBeCalled();


  });

});
