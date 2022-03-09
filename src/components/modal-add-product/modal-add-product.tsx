import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProductInCart } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { GuitarTypeRU } from '../filters/filters';

type ModalAddProductProps = {
  product: Guitar,
  onSetOpenModalAdd: (open: boolean) => void,
  onSetOpenModalSuccessAdd: (open: boolean) => void
}

function ModalAddProduct({product, onSetOpenModalAdd, onSetOpenModalSuccessAdd}: ModalAddProductProps){

  const dispatch = useDispatch();
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const addButton = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  let iterator = true;

  const setFocus = (evt: KeyboardEvent) => {
    if ( evt.key === 'Tab' ) {
      if (iterator){
        addButton.current?.focus();
        iterator = false;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup',  (evt)=>setFocus(evt));
    return () => document.removeEventListener('keyup', (evt)=>setFocus(evt));
  });

  return (
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}  >
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal
            data-testid = {'modal__overlay'}
            onClick={() => {
              onSetOpenModalAdd(false);
            }}
          >
          </div>
          <div className="modal__content" ref = {modalRef} >
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={product.previewImg} width="67" height="137" alt={product.name}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {product.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {product.vendorCode}</p>
                <p className="modal__product-params">{GuitarTypeRU[product.type]} {product.stringCount} струнная</p>
                <p className="modal__price-wrapper" >
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{new Intl.NumberFormat('ru').format(product.price)} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container" >
              <button className="button button--red button--big modal__button modal__button--add"
                ref={addButton}
                tabIndex={-1}
                onBlur={() => closeButton.current?.focus()}
                onClick={() => {
                  dispatch(addProductInCart(product));
                  onSetOpenModalAdd(false);
                  onSetOpenModalSuccessAdd(true);
                }}
              >
                Добавить в корзину
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              data-testid = {'button-close'}
              ref = {closeButton}
              tabIndex={-1}
              onBlur={() => addButton.current?.focus()}
              onClick={() => {
                onSetOpenModalAdd(false);
              }}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProduct;
