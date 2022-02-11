import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { Provider} from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { AppRoute } from '../../const';
import {commentsCountArray } from '../../utils/mocks/comments';
import thunk from 'redux-thunk';
import FormSearch from './form-search';
import userEvent from '@testing-library/user-event';

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
      <FormSearch />
    </Router>
  </Provider>
);

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp());

    userEvent.type(screen.getByTestId('search'), 'Честер');
    expect(screen.getByDisplayValue(/Честер/i)).toBeInTheDocument();

    guitars.forEach((guitar) =>
      expect(screen.getByText(guitar.name)).toBeInTheDocument());

    userEvent.click(screen.getAllByRole('link')[0]);

    expect(history.location.pathname ===`${AppRoute.Catalog+1}`).toBeTruthy();
  });

});
