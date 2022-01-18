import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
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

});
