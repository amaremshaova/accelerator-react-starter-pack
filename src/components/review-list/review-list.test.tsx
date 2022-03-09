import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { comments} from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import ReviewList from './review-list';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {comments: comments,
    commentsCount: [{id: 1, count: comments.length}],
    isLoadComments: true},
});

const history = createMemoryHistory();

const setOpenModalReview = jest.fn();
const isOpenModalSuccessReview = false;

const fakeApp = () => (
  <Provider store = {store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={AppRoute.Catalog + 1} element=
          {
            <ReviewList isOpenModalSuccessReview={isOpenModalSuccessReview} onSetOpenModalReview={setOpenModalReview} id={1}/>
          }
        />
      </Routes>
    </Router>
  </Provider>
);


describe('Component: Review', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);

    render(fakeApp());

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getAllByText(/Достоинства/)).toHaveLength(2);
    expect(screen.getAllByText(/Недостатки/)).toHaveLength(2);
    expect(screen.getAllByText(/Комментарий/)).toHaveLength(2);
    expect(screen.queryByText(/Показать еще отзывы/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Наверх/)).not.toBeInTheDocument();

    comments.forEach((item) => {
      expect(screen.getByText(item.userName)).toBeInTheDocument();
      expect(screen.getByText(item.advantage)).toBeInTheDocument();
      expect(screen.getByText(item.disadvantage)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/Оставить отзыв/));
    expect(setOpenModalReview).toBeCalled();

  });

});
