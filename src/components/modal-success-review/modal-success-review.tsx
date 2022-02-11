import { useEffect } from 'react';

type ModalSuccessReviewProps = {
  onSetOpenModalSuccessReview: (open: boolean) => void
}

function ModalSuccessReview({onSetOpenModalSuccessReview}: ModalSuccessReviewProps):JSX.Element{

  const escFunction = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      onSetOpenModalSuccessReview(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (evt)=> escFunction(evt));
    return () => {
      document.removeEventListener('keydown', (evt)=> escFunction(evt));
    };
  });

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay"
            data-testid="modal__overlay"
            data-close-modal
            onClick={()=> {
              onSetOpenModalSuccessReview(false);
            }}
          >
          </div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use href="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={()=>onSetOpenModalSuccessReview(false)}
              >
                К покупкам!
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"  data-testid="button-close"
              onClick={()=>{
                onSetOpenModalSuccessReview(false);
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

export default ModalSuccessReview;

