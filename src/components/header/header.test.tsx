import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Route, Router, Routes} from 'react-router-dom';
import { Provider} from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { AppRoute } from '../../const';
import {commentsCountArray } from '../../utils/mocks/comments';
import Header from './header';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();

const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: guitarsCount,
    minPrice: minPrice,
    maxPrice: maxPrice,
    commentsCount: commentsCountArray},
  APP : {productsInCart: [{product: guitars[0], count: 1}]},
});

const history = createMemoryHistory();


describe('Component: Header', () => {
  it('should render correctly', () => {

    history.push(AppRoute.Catalog);

    const fakeApp = ()=>(
      <Provider store = {store}>
        <Router location={history.location} navigator={history} >
          <Header />
        </Router>
      </Provider>
    );

    render(fakeApp());

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Где купить?')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getAllByRole('link')[0]).toHaveClass('header__logo logo');
    expect(screen.getAllByRole('link').filter((item) => item.classList.contains('header__cart-link')))
      .not.toBeNull();
    expect(screen.getByTestId('form-search__form')).not.toBeNull();
  });

  it('should redirect to cart url when user clicked to link', async () => {
    history.push(AppRoute.CatalogStartPage);

    const fakeApp = () => (
      <Provider store = {store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path={AppRoute.CatalogStartPage} element={<Header />}/>
            <Route path = {AppRoute.Cart} element={<>This is cart page</>}/>
          </Routes>
        </Router>
      </Provider>
    );
    render(fakeApp());

    expect(screen.queryByTitle(/This is cart page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText('Корзина'));
    render(fakeApp());
    expect(screen.getByText('This is cart page')).toBeInTheDocument();
  });
});

