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

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp());

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
    expect(screen.getByText(/Товар/i)).toBeInTheDocument();
    expect(screen.getByText(/UI-kit/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/catalog/page_id', () => {
    history.push(AppRoute.StartPage);

    render(fakeApp());
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });


});


