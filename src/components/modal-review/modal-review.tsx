import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview} from '../../store/actions';
import { addReviewAction } from '../../store/api-actions';
import { getResponseStatus } from '../../store/app-process/selectors';
import { getComments} from '../../store/guitar-data/selectors';
import { Guitar } from '../../types/guitar';

type ModalReviewProps = {
  product: Guitar,
  onSetOpenModalReview: (open: boolean) => void,
  onSetOpenModalSuccessReview: (open: boolean) => void,
}

const SUCCESS_STATUS = 201;

const enum RatingType{
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five  = 5

}

const INITIAL_STATUS = 0;

export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}


function ModalReview({product, onSetOpenModalReview, onSetOpenModalSuccessReview} : ModalReviewProps):JSX.Element{

  const dispatch = useDispatch();

  const [review, setReview] = useState(
    {
      userName: '',
      advantage:  ' ',
      disadvantage:  ' ',
      comment:  ' ',
      rating: 0,
      guitarId: product.id,
    });

  const [isRating, setIsRating] = useState(true);
  const [isName, setIsName] = useState(true);

  const status = useSelector(getResponseStatus);
  const comments = useSelector(getComments);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    review.rating === 0 ? setIsRating(false) : setIsRating(true);
    review.userName === '' ? setIsName(false) : setIsName(true);
    if (isRating && isName) {
      dispatch(addReviewAction(review));
    }
  };

  const escFunction = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      onSetOpenModalReview(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (evt)=> escFunction(evt));
    return () => {
      document.removeEventListener('keydown', (evt)=> escFunction(evt));
    };
  });

  useEffect(() => {
    if (status === SUCCESS_STATUS) {
      onSetOpenModalReview(false);
      onSetOpenModalSuccessReview(true);
      dispatch(addReview(INITIAL_STATUS));
    }
  }, [status, comments, onSetOpenModalReview, onSetOpenModalSuccessReview, dispatch]);

  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}} >
      <div className="modal is-active modal--review modal-for-ui-kit" >
        <div className="modal__wrapper" >
          <div className="modal__overlay" data-close-modal
            data-testid="modal__overlay"
            onClick={()=> {onSetOpenModalReview(false);
            }}
          >
          </div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{product.name}</h3>
            <form className="form-review" onSubmit={(evt)=>handleFormSubmit(evt)}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name"
                    autoFocus
                    data-testid="name"
                    tabIndex={1}
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    onChange={({target}: ChangeEvent<HTMLInputElement>) => setReview({...review, userName: target.value})}
                  />
                  {!isName ? <span className="form-review__warning">Заполните поле</span> : ''}
                </div>
                <div>
                  <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input
                      className="visually-hidden" type="radio" id="star-5" name="rate" value="5"
                      onChange={()=>setReview({...review, rating: RatingType.Five})}
                      checked={review.rating === RatingType.Five}
                    />
                    <label
                      onKeyPress={(evt)=>{
                        if (evt.code === 'Enter'){
                          setReview({...review, rating: RatingType.Five});
                          setIsRating(true);
                        }
                      }}
                      tabIndex={6} className="rate__label" htmlFor="star-5" title="Отлично"
                    >
                    </label>
                    <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4"
                      onChange={()=>setReview({...review, rating: RatingType.Four})}
                      checked={review.rating === RatingType.Four}
                    />
                    <label tabIndex={5} className="rate__label" htmlFor="star-4" title="Хорошо"
                      onKeyPress={(evt)=>{
                        if (evt.code === 'Enter'){
                          setReview({...review, rating: RatingType.Four});
                          setIsRating(true);
                        }
                      }}
                    >
                    </label>
                    <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3"
                      onChange={()=>setReview({...review, rating: RatingType.Three})}
                      checked={review.rating === RatingType.Three}
                    />
                    <label
                      onKeyPress={(evt)=>{
                        if (evt.code === 'Enter'){
                          setReview({...review, rating: RatingType.Three});
                          setIsRating(true);
                        }
                      }}
                      tabIndex={4} className="rate__label" htmlFor="star-3" title="Нормально"
                    >
                    </label>
                    <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2"
                      onChange={()=>setReview({...review, rating: RatingType.Two})}
                      checked={review.rating === RatingType.Two}
                    />
                    <label
                      onKeyPress={(evt)=>{
                        if (evt.code === 'Enter'){
                          setReview({...review, rating: RatingType.Two});
                          setIsRating(true);
                        }
                      }}
                      tabIndex={3} className="rate__label" htmlFor="star-2" title="Плохо"
                    >
                    </label>
                    <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1"
                      onChange={()=>setReview({...review, rating: RatingType.One})}
                      checked={review.rating === RatingType.One}
                    />
                    <label
                      onKeyPress={(evt)=>{
                        if (evt.code === 'Enter'){
                          setReview({...review, rating: RatingType.One});
                          setIsRating(true);
                        }
                      }}
                      tabIndex={2} className="rate__label" htmlFor="star-1" title="Ужасно"
                    >

                    </label>
                    <span className="rate__count"></span>
                    {!isRating ? <span className="rate__message"  >Поставьте оценку</span> : ''}
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input tabIndex={7} className="form-review__input" id="pros" type="text" autoComplete="off"
                data-testid="advantages"
                onChange={({target}: ChangeEvent<HTMLInputElement>) => setReview({...review, advantage: target.value})}
              />
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input tabIndex={8} className="form-review__input" id="user-name" type="text" autoComplete="off"
                data-testid="disadvantages"
                onChange={({target}: ChangeEvent<HTMLInputElement>) => setReview({...review, disadvantage: target.value})}
              />
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea"
                data-testid="comments"
                tabIndex={9}
                id="user-name"
                rows={10}
                autoComplete="off"
                onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => setReview({...review, comment: target.value})}
              >
              </textarea>
              <button tabIndex={10} className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              tabIndex={10}
              data-testid="button-close"
              onBlur={()=>nameRef.current?.focus()}
              onClick={()=>onSetOpenModalReview(false)}
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

export default ModalReview;
