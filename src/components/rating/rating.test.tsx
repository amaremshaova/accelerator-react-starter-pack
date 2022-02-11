import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import Rating from './rating';

const history = createMemoryHistory();

const rating = 3.5;
const id = 1;


describe('Component: Rating', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog + 1);

    render(
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Catalog + 1} element={<Rating rating={rating} id={String(id)} width={0} height={0}/>}/>
        </Routes>
      </Router>,
    );


    expect(await screen.findAllByTestId('100-icon').then((data)=> data.length)).toBe(3);
    expect(await screen.findAllByTestId('50-icon').then((data)=> data.length)).toBe(1);
    expect(await screen.findAllByTestId('0-icon').then((data)=> data.length)).toBe(1);
  });

});
