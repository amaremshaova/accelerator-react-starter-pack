import {render} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { guitars, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Catalog from './catalog';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: 27,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
});

const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    history.push(AppRoute.Catalog);

    const {container} = render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog} element={ <Catalog/>}/>
          </Routes>
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
