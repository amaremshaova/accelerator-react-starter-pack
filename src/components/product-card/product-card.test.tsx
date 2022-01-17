import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductCard from './product-card';


const mockStore = configureMockStore();

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: guitarsCount,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
});

const history = createMemoryHistory();

const product = guitars[0];


describe('Component: ProductCard', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog);

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog} element={<ProductCard product={product}/>}/>
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(commentsCountArray[0].count)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();


    expect(await screen.findAllByTestId('100-icon').then((data) => data.length)).toBe(3);
    expect(await screen.findAllByTestId('50-icon').then((data) => data.length)).toBe(1);
    expect(await screen.findAllByTestId('0-icon').then((data) => data.length)).toBe(1);
  });

});
