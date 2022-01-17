import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import Main from './main';
import Catalog from '../catalog/catalog';
import { Provider } from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';


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

const fakeApp = () => (
  <Provider store={store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.Catalog} element={<Catalog />}/>
        <Route path={AppRoute.Cart} element={<>This is cart page</>}/>
        <Route path={AppRoute.Guitar} element={<>This is guitar page</>}/>
      </Routes>
    </Router>
  </Provider>);


describe('Component: Main', () => {
  it('should render correctly', async () => {

    render(
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Main} element={<Main/>}/>
        </Routes>
      </Router>,
    );

    expect(screen.getByText('UI-kit')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText('Товар')).toBeInTheDocument();
  });

  it('should redirect to cart url when user clicked to link', () => {
    history.push(AppRoute.Main);
    render(fakeApp());

    expect(screen.queryByText(/This is cart page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: 'Корзина'}));

    render(fakeApp());
    screen.getByText(/This is cart page/i);
  });

  it('should redirect to guitar url when user clicked to link', () => {
    history.push(AppRoute.Main);
    render(fakeApp());

    expect(screen.queryByText(/This is guitar page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: 'Товар'}));

    render(fakeApp());
    screen.getByText(/This is guitar page/i);
  });


/*  it('should redirect to catalog url when user clicked to link', () => {
    history.push(AppRoute.Main);
    render(fakeApp());

    expect(screen.queryByText('Каталог гитар')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: 'Каталог'}));

    render(fakeApp());
    screen.getByText('Каталог гитар');
  });*/
});


