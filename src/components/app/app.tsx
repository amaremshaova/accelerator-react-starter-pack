import { Routes, Route, Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';

import Catalog from '../catalog/catalog';
import NotFoundPage from '../not-found-page/not-found-page';
import ProductPage from '../product-page/product-page';


function App(): JSX.Element {
  return (
    <Routes >
      <Route path={AppRoute.Root} element={<Navigate to={AppRoute.CatalogStartPage} />}/>
      <Route path={`${AppRoute.CatalogPage  }:id`} element={<Catalog />}/>
      <Route path={`${AppRoute.Catalog  }:id`} element={<ProductPage />}/>
      <Route path={AppRoute.Undefined} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
