import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { Provider} from 'react-redux';
import App from './app';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { AppRoute } from '../../const';
import {commentsCountArray } from '../../utils/mocks/comments';
import thunk from 'redux-thunk';

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

const history = createMemoryHistory();

const fakeApp = ()=>(
  <Provider store = {store}>
    <Router location={history.location} navigator={history} >
      <App />
    </Router>
  </Provider>
);

window.scroll = jest.fn(()=>'w');

describe('Application Routing', () => {

  it('should render "Catalog" when user navigate to "/catalog/page_id', () => {
    history.push(AppRoute.CatalogStartPage);
    window.scrollTo = jest.fn();
    window.scrollTo();

    render(fakeApp());
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "Product Page" when user navigate to "/catalog/id', () => {
    history.push(AppRoute.Catalog + 1);

    render(fakeApp());
    expect(screen.getByText(/Загрузка информации о товаре.../i)).toBeInTheDocument();
    expect(screen.getByText(/Загрузка отзывов.../i)).toBeInTheDocument();
  });


});


