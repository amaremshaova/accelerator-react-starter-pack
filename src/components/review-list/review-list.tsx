import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { fetchGuitarAction} from '../../store/api-actions';
import { getComments, getCommentsCount} from '../../store/product-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { StartScroll } from '../product-page/product-page';
import Review from './review';

const INITIAL_REVIEWS_COUNT = 3;
const TIMEOUT_SCROLL = 1000;
const QUARTER_PAGE = 4;
const TEXT_LOADING = 'Загрузка отзывов...';

type ReviewListProps = {
  id: number,
  onSetOpenModalReview: (open: boolean) => void,
  isOpenModalSuccessReview: boolean,
}


function ReviewList({ id, isOpenModalSuccessReview, onSetOpenModalReview} : ReviewListProps) : JSX.Element {

  const dispatch = useDispatch();
  const comments = useSelector(getComments);
  const commentsCount = useSelector(getCommentsCount).filter((item) => item.id === Number(id))[0]?.count;
  const isLoad = comments !== undefined;

  const listRef = useRef<HTMLDivElement | null>(null);

  const [renderedCommentsCount, setRenderedCommentsCount] = useState(INITIAL_REVIEWS_COUNT-1);
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(INITIAL_REVIEWS_COUNT);

  const checkPosition = () => {

    setTimeout( () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / QUARTER_PAGE;
      const position = scrolled + screenHeight;

      if (position >= threshold && renderedReviewsCount <= commentsCount && isLoad) {
        setRenderedReviewsCount(renderedReviewsCount + INITIAL_REVIEWS_COUNT);
      }
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener('scroll',  checkPosition);
    return () => document.removeEventListener('scroll', checkPosition);
  });


  useEffect(() => {
    if (isOpenModalSuccessReview){
      dispatch(fetchGuitarAction(Number(id), 0, renderedReviewsCount));
    }
  }, [dispatch, id,  isOpenModalSuccessReview, renderedReviewsCount]);

  useEffect(() => {
    dispatch(fetchGuitarAction(id, 0, renderedReviewsCount));
  }, [dispatch, id, renderedReviewsCount]);

  useEffect(() => {
    setRenderedCommentsCount(comments?.length);
    if (renderedReviewsCount !== INITIAL_REVIEWS_COUNT){
      setTimeout(() => {
        document.querySelector(`.reviews__comment${renderedCommentsCount}`)?.scrollIntoView();}, TIMEOUT_SCROLL);
    }
  }, [comments?.length, commentsCount, dispatch, id, renderedCommentsCount, renderedReviewsCount]);


  useEffect(() => {
    setRenderedReviewsCount(INITIAL_REVIEWS_COUNT);
  }, [id]);

  return (
    <section className="reviews" ref = {listRef}>
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href={AppRoute.Empty}
        onClick={(evt) => {
          evt.preventDefault();
          onSetOpenModalReview(true);
        }}
      >
        Оставить отзыв
      </a>
      {
        isLoad ? comments.slice(0, renderedReviewsCount).map((comment, index) =>
          (
            <div key ={comment.id+comment.userName} className={`reviews__comment${  index}`}>
              <Review comment={comment} key={comment.id+comment.userName} />
            </div>))
          : <LoadingScreen textLoading={TEXT_LOADING}/>
      }
      {
        (renderedReviewsCount <  commentsCount) ?
          <button
            className="button button--medium reviews__more-button"
            onClick={(evt)=>{
              setRenderedReviewsCount(renderedReviewsCount + INITIAL_REVIEWS_COUNT);
              evt.currentTarget.blur();
            }}
          >
              Показать еще отзывы
          </button>
          : ''
      }
      {
        ( window.scrollY > 0 && comments) ?
          <a className="button button--up button--red-border button--big reviews__up-button"
            href="#header"
            style={{zIndex: '100'}}
            onClick={(evt)=> {
              evt.preventDefault();
              window.scrollTo(StartScroll.X, StartScroll.Y);
              evt.currentTarget.blur();}}

          >Наверх
          </a> : ''
      }
    </section>
  );
}


export default ReviewList;
