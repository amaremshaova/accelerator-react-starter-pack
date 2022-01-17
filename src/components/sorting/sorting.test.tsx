import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Sorting from './sorting';
import { SortOrder, SortType } from '../product-list/product-list';
import userEvent from '@testing-library/user-event';


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

describe('Component: Sorting', () => {
  it('should render correctly', async () => {
    const sortType = SortType.Rating;
    const sortOrder = SortOrder.Down;

    history.push(AppRoute.Catalog);
    const setSortType = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}
              element={
                <Sorting sortTypeActive={sortType}
                  sortOrderActive={sortOrder}
                  onSetSortType={setSortType}
                  onSetSortDirect={setSortOrder}
                />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('по цене')).not.toHaveClass('catalog-sort__type-button--active');
    expect(screen.getByLabelText('по популярности')).toHaveClass('catalog-sort__type-button--active');
    expect(screen.getByLabelText('По возрастанию')).not.toHaveClass('catalog-sort__order-button--active');
    expect(screen.getByLabelText('По убыванию')).toHaveClass('catalog-sort__order-button--active');

  });

  it('should render correctly with sortType===null', async () => {
    const sortType = null;
    const sortOrder = SortOrder.Down;

    history.push(AppRoute.Catalog);

    const setSortType = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}
              element={
                <Sorting sortTypeActive={sortType}
                  sortOrderActive={sortOrder}
                  onSetSortType={setSortType}
                  onSetSortDirect={setSortOrder}
                />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('по цене')).not.toHaveClass('catalog-sort__type-button--active');
    expect(screen.getByLabelText('по популярности')).not.toHaveClass('catalog-sort__type-button--active');

    expect(screen.getByLabelText('По возрастанию')).not.toHaveClass('catalog-sort__order-button--active');
    expect(screen.getByLabelText('По убыванию')).toHaveClass('catalog-sort__order-button--active');
    userEvent.click(screen.getByTestId('button-up'));
    expect(setSortOrder).toBeCalled();
    expect(setSortType).toBeCalled();

  });


  it('should render correctly with sortType !== null', async () => {
    const sortType = SortType.Price;
    history.push(AppRoute.Catalog);
    const sortOrder = SortOrder.Up;

    const setSortType = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <Provider store = {store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}
              element={
                <Sorting sortTypeActive={sortType}
                  sortOrderActive={sortOrder}
                  onSetSortType={setSortType}
                  onSetSortDirect={setSortOrder}
                />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('по цене')).toHaveClass('catalog-sort__type-button--active');
    expect(screen.getByLabelText('по популярности')).not.toHaveClass('catalog-sort__type-button--active');

    expect(screen.getByLabelText('По возрастанию')).toHaveClass('catalog-sort__order-button--active');
    expect(screen.getByLabelText('По убыванию')).not.toHaveClass('catalog-sort__order-button--active');
    userEvent.click(screen.getByTestId('button-down'));
    expect(setSortOrder).toBeCalled();
    expect(setSortType).not.toBeCalled();

  });

});
