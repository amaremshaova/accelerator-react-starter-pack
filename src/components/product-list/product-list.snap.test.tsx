import {render} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductList from './product-list';
import { Provider } from 'react-redux';
import { guitars, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import Main from '../main/main';
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

describe('Component: ProductList', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);
    const {container} = render(
      <Provider store = {store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Catalog} element={ <ProductList />}/>
            <Route path={AppRoute.Main} element={ <Main/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
