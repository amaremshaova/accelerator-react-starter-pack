import { AppRoute } from '../../const';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductList from '../product-list/product-list';

export const COUNT_CARDS = 9;
const CRUMBS = [{name: 'Главная', link: AppRoute.Main}, {name: 'Каталог', link: AppRoute.CatalogStartPage}];

function Catalog():JSX.Element{
  return(
    <>
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs crumbs = {CRUMBS}/>
          <ProductList/>
        </div>
      </main>
      <Footer/>
    </> );
}

export default Catalog;
