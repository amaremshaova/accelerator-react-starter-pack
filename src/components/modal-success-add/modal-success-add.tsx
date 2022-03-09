import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type ModalSuccessAddProps = {
  onSetOpenModalSuccessAdd: (open: boolean) => void
}

function ModalSuccessAdd({onSetOpenModalSuccessAdd}: ModalSuccessAddProps){
  const history = useNavigate();
  const inCartButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const buyNextButton =  useRef<HTMLButtonElement | null>(null);
  const modalRef =  useRef<HTMLDivElement | null>(null);

  let iterator = true;

  const setFocus = (evt: KeyboardEvent) => {
    if ( evt.key === 'Tab' ) {
      if (iterator && inCartButton.current){
        inCartButton.current.focus();
        iterator = false;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup',  (evt)=>setFocus(evt));
    return () => document.removeEventListener('keyup', (evt)=>setFocus(evt));
  });

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal
            data-testid = {'modal__overlay'}
            onClick={() => {
              onSetOpenModalSuccessAdd(false);
            }}
          >
          </div>
          <div className="modal__content" ref={modalRef}  >
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use href="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button"
                data-testid = {'button-back-cart'}
                tabIndex={-1}
                ref = {inCartButton}
                onBlur={() => {
                  buyNextButton.current?.focus();
                }}
                onClick={() => {
                  onSetOpenModalSuccessAdd(false);
                  history(AppRoute.Cart);
                }}
              >
                Перейти в корзину
              </button>
              <button className="button button--black-border button--small modal__button modal__button--right"
                tabIndex={-1}
                ref = {buyNextButton}
                onBlur={() => {
                  closeButton.current?.focus();
                }}
                onClick={() => {
                  onSetOpenModalSuccessAdd(false);
                  history(AppRoute.CatalogStartPage);
                }}

              >Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross"
              data-testid="button-close"
              ref={closeButton}
              type="button"
              tabIndex={-1}
              aria-label="Закрыть"
              autoFocus
              onClick={() => {
                onSetOpenModalSuccessAdd(false);
              }}
              onBlur={() => {
                inCartButton.current?.focus();
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

export default ModalSuccessAdd;
