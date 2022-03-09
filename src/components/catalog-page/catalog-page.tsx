import { useEffect, useState } from 'react';
import { AppRoute } from '../../const';
import { Guitar } from '../../types/guitar';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import ProductList from '../product-list/product-list';

export const COUNT_CARDS = 9;
const CRUMBS = [{name: 'Главная', link: AppRoute.Main}, {name: 'Каталог', link: AppRoute.CatalogStartPage}];

function Catalog():JSX.Element{

  const [isOpenModalAdd, setOpenModalAdd] = useState(false);
  const [isOpenModalSuccessAdd, setOpenModalSuccessAdd] = useState(false);

  const [activeProduct, setActiveProduct] = useState<Guitar | undefined>(undefined);
  const body = document.querySelector('body');

  useEffect(()=>{
    if (body !== null) {
      body.style.overflow = isOpenModalAdd || isOpenModalSuccessAdd
        ? 'hidden' : 'visible';
    }
  }, [body, isOpenModalAdd, isOpenModalSuccessAdd]);


  window.onkeydown = function( evt ) {
    if ( evt.code === 'Escape' ) {
      if (isOpenModalAdd || isOpenModalSuccessAdd) {
        setOpenModalAdd(false);
        setOpenModalSuccessAdd(false);
      }
    }
  };

  return(
    <>
      <Header/>
      <main className="page-content" >
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs crumbs = {CRUMBS}/>
          <ProductList onSetActiveProduct = {setActiveProduct} onSetOpenModalAdd={setOpenModalAdd}/>
        </div>
      </main>
      <Footer/>
      {
        isOpenModalAdd && activeProduct?
          <ModalAddProduct
            product = {activeProduct}
            onSetOpenModalAdd={setOpenModalAdd}
            onSetOpenModalSuccessAdd={setOpenModalSuccessAdd}
          /> : ''
      }
      {
        isOpenModalSuccessAdd ?
          <ModalSuccessAdd
            onSetOpenModalSuccessAdd={setOpenModalSuccessAdd}
          /> : ''
      }
    </> );
}

export default Catalog;
