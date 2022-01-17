import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import StarIcon from './star-icon';

const history = createMemoryHistory();

const percent = 100;
const id = 1;


describe('Component: StarIcon', () => {
  it('should render correctly', async () => {

    history.push(AppRoute.Catalog);

    render(
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<StarIcon percent={percent} id={String(id)}/>}/>
        </Routes>
      </Router>,
    );


    expect(await screen.findAllByTestId('100-icon').then((data)=> data.length)).toBe(1);
  });

});
