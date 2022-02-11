import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import BreadCrumbs from './breadcrumbs';

const history = createMemoryHistory();

const CRUMBS = [{name: 'Главная', link: AppRoute.Main},
  {name: 'Каталог', link: AppRoute.CatalogStartPage}];


describe('Component: BreadCrumbs', () => {
  it('should render correctly', async () => {
    history.push(AppRoute.CatalogStartPage);
    render(
      <Router location={history.location} navigator={history} >
        <Routes>
          <Route path={`${AppRoute.CatalogPage}:id`} element={<BreadCrumbs crumbs={CRUMBS}/>}/>
        </Routes>
      </Router>);
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Главная');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('Каталог');
  });

});
