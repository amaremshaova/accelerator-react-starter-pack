import {render} from '@testing-library/react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { guitars, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import Catalog from '../catalog-page/catalog-page';
import ProductPage from '../product-page/product-page';
import NotFoundPage from '../not-found-page/not-found-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: 27,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
  APP : {productsInCart: [{product: guitars[0], count: 1}]},
});

const history = createMemoryHistory();

describe('Component: ProductList', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog + 1);
    const {container} = render(
      <Provider store = {store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root} element={<Navigate to={AppRoute.CatalogStartPage} />}/>
            <Route path={`${AppRoute.CatalogPage  }:id`} element={<Catalog />}/>
            <Route path={`${AppRoute.Catalog  }:id`} element={<ProductPage />}/>
            <Route path={AppRoute.Undefined} element={<NotFoundPage/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
