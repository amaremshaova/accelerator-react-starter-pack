import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import BreadCrumbs from './breadcrumbs';

const history = createMemoryHistory();


describe('Component: BreadCrumbs', () => {
  it('should render correctly', async () => {
    history.push(AppRoute.StartPage);
    render(
      <Router location={history.location} navigator={history} >
        <Routes>
          <Route path={AppRoute.Catalog} element={<BreadCrumbs />}/>
        </Routes>
      </Router>);
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Главная');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('Каталог');
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push(AppRoute.StartPage);

    const fakeApp = () => (
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={AppRoute.StartPage} element={<BreadCrumbs />}/>
          <Route path = {AppRoute.Main} element={<>This is main page</>}/>
        </Routes>
      </Router>
    );
    render(fakeApp());

    expect(screen.queryByTitle(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('link')[0]);
    render(fakeApp());
    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });

});
