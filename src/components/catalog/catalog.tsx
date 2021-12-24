import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductList from '../product-list/product-list';

function Catalog():JSX.Element{
  return(
    <>
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs/>
          <ProductList/>
        </div>
      </main>
      <Footer/>
    </> );
}

export default Catalog;
