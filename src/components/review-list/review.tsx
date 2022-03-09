import moment from 'moment';
import 'moment/locale/ru';
import { Comment } from '../../types/comment';
import Rating from '../rating/rating';

type ReviewProps = {
  comment: Comment
}

const enum RatingProperty {
  Width = 16,
  Height = 16
}


function Review({comment}: ReviewProps) : JSX.Element{

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">
          {moment(comment.createAt).format('DD MMMM')}
        </span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <span className="visually-hidden">Рейтинг:</span>
        <Rating rating={comment.rating} id={comment.id} width={RatingProperty.Width} height={RatingProperty.Height}  />
        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      {comment.advantage !== ' ' ?
        <>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">{comment.advantage}</p>
        </>
        : ''}
      {comment.disadvantage !== ' ' ?
        <>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">{comment.disadvantage}</p>
        </>
        : ''}
      {comment.comment !== ' ' ?
        <>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">{comment.comment}</p>
        </>
        : ''}
    </div>
  );
}


export default Review;
