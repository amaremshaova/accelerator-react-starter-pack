import { Routes, Route, Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';
import CartPage from '../cart-page/cart-page';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ProductPage from '../product-page/product-page';


function App(): JSX.Element {
  return (
    <Routes >
      <Route path={AppRoute.Root} element={<Navigate to={AppRoute.CatalogStartPage} />}/>
      <Route path={`${AppRoute.CatalogPage  }:id`} element={<CatalogPage />}/>
      <Route path={`${AppRoute.Catalog  }:id`} element={<ProductPage />}/>
      <Route path={AppRoute.Cart} element={<CartPage/>}/>
      <Route path={AppRoute.Undefined} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
