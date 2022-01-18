import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import NotFoundPage from './not-found-page';


const history = createMemoryHistory();


describe('Component: NotFoundPage', () => {
  it('should render correctly', async () => {

    render(
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Undefined} element={<NotFoundPage/>}/>
        </Routes>
      </Router>,
    );
    const headerElement = screen.getByText('404.Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });


});
