import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import NotFoundPage from './not-found-page';


const history = createMemoryHistory();

const fakeApp = () => (
  <Router navigator={history} location={history.location}>
    <Routes>
      <Route path={AppRoute.Main} element={<>This is main page</>}/>
      <Route path={AppRoute.Undefined} element={<NotFoundPage />}/>
    </Routes>
  </Router>);


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

  it('should redirect to root url when user clicked to link', async () => {
    history.push(AppRoute.Undefined);
    render(fakeApp());

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));

    render(fakeApp());
    await screen.findByText(/This is main page/i);
  });


});
