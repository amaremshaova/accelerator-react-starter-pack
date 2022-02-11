import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { comments, commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import Review from './review';
import moment from 'moment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: guitarsCount,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: [{id: 1, count: commentsCountArray}],
    isLoad: true},
});

const history = createMemoryHistory();

const comment = comments[0];


describe('Component: Review', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog + 1} element={<Review comment={comment}/>}/>
          </Routes>
        </Router>
      </Provider>,
    );

    expect(await screen.findAllByTestId('100-icon').then((data)=> data.length)).toBe(3);
    expect(await screen.findAllByTestId('50-icon').then((data)=> data.length)).toBe(1);
    expect(await screen.findAllByTestId('0-icon').then((data)=> data.length)).toBe(1);
    expect(screen.getByText(comment.userName)).toBeInTheDocument();
    expect(screen.getByText(comment.advantage)).toBeInTheDocument();
    expect(screen.getByText(comment.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(moment(comment.createAt).format('DD MMMM'))).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/)).toBeInTheDocument();

  });

});
