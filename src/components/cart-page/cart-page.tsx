import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { getProductsInCart } from '../../store/app-process/selectors';
import { Guitar } from '../../types/guitar';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import CartFooter from '../cart-footer/cart-footer';
import CartItem from '../cart-item/cart-item';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalDeleteProduct from '../modal-delete-product/modal-delete-product';

const CRUMBS = [{name: 'Главная', link: AppRoute.Main},
  {name: 'Каталог', link: AppRoute.CatalogStartPage},
  {name: 'Корзина', link: AppRoute.Empty}];

function CartPage(){

  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Guitar | undefined>(undefined);

  const productsInCart = useSelector(getProductsInCart);
  const body = document.querySelector('body');

  useEffect(()=>{
    if (body !== null) {
      body.style.overflow = isOpenModalDelete ? 'hidden' : 'visible';
    }
  }, [body, isOpenModalDelete]);

  window.onkeydown = function( evt ) {
    if ( evt.code === 'Escape' ) {
      if (isOpenModalDelete) {
        setOpenModalDelete(false);
      }
    }
  };

  return(

    <>
      <Header />
      <main className="page-content"
        onKeyDown={(evt)=> {
          if (evt.code === 'Escape') {
            if (isOpenModalDelete) {
              setOpenModalDelete(false);
            }
          }
        }}
      >
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <BreadCrumbs crumbs={CRUMBS}/>
          <div className="cart">
            {productsInCart.map((productItem) =>
              (
                <CartItem
                  productItem={productItem}
                  onSetActiveProduct = {setActiveProduct}
                  onSetOpenModalDelete = {setOpenModalDelete}
                  key={`${productItem.product.id}-${productItem.product.name}`}
                />))}
            {productsInCart.length !== 0 ? <CartFooter/> : ''}
          </div>
        </div>
      </main>
      <Footer/>
      {
        isOpenModalDelete && activeProduct?
          <ModalDeleteProduct
            product = {activeProduct}
            onSetOpenModalDelete = {setOpenModalDelete}
          /> : ''
      }
    </> );
}

export default CartPage;
