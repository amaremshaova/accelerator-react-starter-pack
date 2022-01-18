import { Routes, Route, Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';

import Catalog from '../catalog/catalog';
import NotFoundPage from '../not-found-page/not-found-page';


function App(): JSX.Element {
  return (
    <Routes >
      <Route path='/' element={<Navigate to={AppRoute.StartPage} />}/>
      <Route path={AppRoute.Catalog} element={<Catalog />}/>
      <Route  path={AppRoute.Undefined} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
