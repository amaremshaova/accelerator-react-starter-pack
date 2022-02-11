import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { Guitar } from '../../types/guitar';
import Rating from '../rating/rating';

type ProductCardProps = {
  product: Guitar;
}

const enum RatingProperty {
  Width = 12,
  Height = 11
}

function ProductCard({product}: ProductCardProps):JSX.Element{

  const commentsCount = useSelector(getCommentsCount);
  const handleGetCommentsCount = () => {
    const commentsCountArray = commentsCount? commentsCount.filter((item) => item.id === product.id) : [];
    return commentsCountArray.length === 0 ? '' : commentsCountArray[0].count;
  };

  return(
    <div className="product-card">
      <img src={product.previewImg} width="75" height="190" alt={product.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <Rating rating={product.rating} id={String(product.id)} width={RatingProperty.Width} height={RatingProperty.Height}/>

          <span className="rate__count">{handleGetCommentsCount()}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoute.Catalog + product.id}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href={AppRoute.Main}>Купить</a>
      </div>
    </div>
  );
}


export default ProductCard;

