import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Pagination from './pagination';
import { AnyAction } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();

const history = createMemoryHistory();

window.scrollTo = jest.fn();

const fakeApp = (store: MockStore<unknown, AnyAction>, pageActive : number, setPage : ()=> void) => (
  <Provider store = {store}>
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path={AppRoute.Catalog}
          element={
            <Pagination
              pageActive = {pageActive}
              onSetPage = {setPage}
            />
          }
        />
      </Routes>
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });

    const pageActive = 1;
    const setPage = jest.fn();

    history.push(AppRoute.Catalog);

    render(fakeApp(store, pageActive, setPage));

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('pagination__page--active');
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();

  });

  it('should render correctly when guitarsCount < 9', () => {

    const store = mockStore({
      DATA: {
        guitarsCount: 5},
    });

    const pageActive = 1;
    const setPage = jest.fn();

    history.push(AppRoute.Catalog);


    render(fakeApp(store, pageActive, setPage));

    expect(screen.getAllByRole('listitem').length).toBe(1);
    expect(screen.getByRole('listitem')).toHaveClass('pagination__page--active');
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();

  });

  it('should render correctly when guitarsCount = 27 and pageActive === 2', () => {

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });

    const pageActive = 2;
    const setPage = jest.fn();

    history.push(AppRoute.Catalog);
    render(fakeApp(store, pageActive, setPage));

    expect(screen.getAllByRole('listitem').length).toBe(5);
    expect(screen.getAllByRole('listitem')[2]).toHaveClass('pagination__page--active');
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('link')[3]);
    expect(setPage).toBeCalled();
    userEvent.click(screen.getAllByRole('link')[2]);
    expect(setPage).toBeCalled();
    userEvent.click(screen.getAllByRole('link')[1]);
    expect(setPage).toBeCalled();
    userEvent.click(screen.getByText('Далее'));
    expect(setPage).toBeCalled();
    userEvent.click(screen.getByText('Назад'));
    expect(setPage).toBeCalled();

  });

  it('should render correctly when guitarsCount = 27 and pageActive === 3', () => {

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });

    const pageActive = 3;
    const setPage = jest.fn();

    history.push(AppRoute.Catalog);


    render(fakeApp(store, pageActive, setPage));

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('listitem')[3]).toHaveClass('pagination__page--active');
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();

  });


  it('the URL should change when clicking on the Далее button', () => {

    const pageActive = 2;
    const setPage = jest.fn();

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });


    history.push(`${AppRoute.Page+pageActive}?&type=acoustic`);
    render(fakeApp(store, pageActive, setPage));

    userEvent.click(screen.getByText('Далее'));
    expect(history.location.pathname ===`${AppRoute.Page}${(pageActive+1)}/`).toBeTruthy();
    expect(history.location.search === '?&type=acoustic').toBeTruthy();

  });

  it('the URL should change when clicking on the Назад button', () => {

    const pageActive = 2;
    const setPage = jest.fn();

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });


    history.push(`${AppRoute.Page+pageActive}?&type=acoustic`);
    render(fakeApp(store, pageActive, setPage));

    userEvent.click(screen.getByText('Назад'));
    expect(history.location.pathname ===`${AppRoute.Page}${(pageActive-1)}/`).toBeTruthy();
    expect(history.location.search === '?&type=acoustic').toBeTruthy();

  });

  it('the URL should change when clicking on the next (3) button', () => {

    const pageActive = 2;
    const setPage = jest.fn();

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });


    history.push(`${AppRoute.Page+pageActive}?&type=acoustic`);
    render(fakeApp(store, pageActive, setPage));

    userEvent.click(screen.getAllByRole('link')[3]);
    expect(history.location.pathname ===`${AppRoute.Page}${(pageActive+1)}/`).toBeTruthy();
    expect(history.location.search === '?&type=acoustic').toBeTruthy();

  });

  it('the URL should change when clicking on the prev (1) button', () => {

    const pageActive = 2;
    const setPage = jest.fn();

    const store = mockStore({
      DATA: {
        guitarsCount: 27},
    });


    history.push(`${AppRoute.Page+pageActive}?&type=acoustic`);
    render(fakeApp(store, pageActive, setPage));

    userEvent.click(screen.getAllByRole('link')[1]);
    expect(history.location.pathname ===`${AppRoute.Page}${(pageActive-1)}/`).toBeTruthy();
    expect(history.location.search === '?&type=acoustic').toBeTruthy();

  });


});
