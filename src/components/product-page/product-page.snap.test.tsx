import {render} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { guitars, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import thunk from 'redux-thunk';
import ProductPage from './product-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: 27,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
  APP : {activeProduct: guitars[0], productsInCart: []},
});

const history = createMemoryHistory();


describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    history.push(AppRoute.Catalog + 1);

    window.scroll = jest.fn(()=>'w');

    const {container} = render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog + 1} element={ <ProductPage/>}/>
          </Routes>
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
