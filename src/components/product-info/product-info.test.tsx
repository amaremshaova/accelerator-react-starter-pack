import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { guitars} from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductInfo from './product-info';
import { GuitarTypeRU } from '../filters/filters';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {activeGuitar: guitars[0],
    commentsCount: commentsCountArray,
    isLoadData: true},
});

const history = createMemoryHistory();

const product = guitars[0];


describe('Component: ProductInfo', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog + 1} element={<ProductInfo product={product}/>}/>
          </Routes>
        </Router>
      </Provider>,
    );

    expect(await screen.findAllByTestId('100-icon').then((data)=> data.length)).toBe(3);
    expect(await screen.findAllByTestId('50-icon').then((data)=> data.length)).toBe(1);
    expect(await screen.findAllByTestId('0-icon').then((data)=> data.length)).toBe(1);
    expect(screen.getByText(GuitarTypeRU[product.type])).toBeInTheDocument();
    expect(screen.getByText(`${product.stringCount  } струнная`)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();

  });

});
