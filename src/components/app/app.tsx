import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

import Catalog from '../catalog/catalog';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';


function App(): JSX.Element {
  return (
    <Routes >
      <Route path={AppRoute.Catalog} element={<Catalog />}/>
      <Route path={AppRoute.Main} element={ <Main/>}/>
      <Route  path={AppRoute.Undefined} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
