import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { deleteProduct } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { GuitarTypeRU } from '../filters/filters';

type ModalDeleteProductProps = {
  product: Guitar,
  onSetOpenModalDelete: (open: boolean) => void;
}

function ModalDeleteProduct({product, onSetOpenModalDelete}: ModalDeleteProductProps){

  const history = useNavigate();
  const dispatch = useDispatch();

  const closeButton = useRef<HTMLButtonElement | null> (null);
  const deleteButton = useRef<HTMLButtonElement | null> (null);
  const buyNextButton = useRef<HTMLButtonElement | null> (null);


  let iterator = true;

  const setFocus = (evt: KeyboardEvent) => {
    if ( evt.key === 'Tab' ) {
      if (iterator){
        deleteButton.current?.focus();
        iterator = false;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup',  (evt)=>setFocus(evt));
    return () => document.removeEventListener('keyup', (evt)=>setFocus(evt));
  });

  return(
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal
            data-testid = {'modal__overlay'}
            onClick={()=> {
              onSetOpenModalDelete(false);
            }}
          >
          </div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={product.previewImg} width="67" height="137" alt={product.name}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {product.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {product.vendorCode}</p>
                <p className="modal__product-params">{GuitarTypeRU[product.type]} {product.stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{new Intl.NumberFormat('ru').format(product.price)} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button"
                ref={deleteButton}
                tabIndex={-1}
                onBlur={()=> buyNextButton.current?.focus()}
                onClick={() => {
                  dispatch(deleteProduct(product.id));
                  onSetOpenModalDelete(false);
                }}
              >
                Удалить товар
              </button>
              <button className="button button--black-border button--small modal__button modal__button--right"
                ref={buyNextButton}
                tabIndex={-1}
                onClick={() => history(AppRoute.CatalogStartPage)}
                onBlur={()=> closeButton.current?.focus()}
              >Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              data-testid = {'button-close'}
              ref={closeButton}
              tabIndex={-1}
              onClick={()=>onSetOpenModalDelete(false)}
              onBlur={()=> deleteButton.current?.focus()}
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

export default ModalDeleteProduct;
