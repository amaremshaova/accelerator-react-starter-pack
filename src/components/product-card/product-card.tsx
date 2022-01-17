import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { Guitar } from '../../types/guitar';
import StarIcon from './star-icon';

type ProductCardProps = {
  product: Guitar;
}


const STARS_COUNT = 5;

function ProductCard({product}: ProductCardProps):JSX.Element{

  const commentsCount = useSelector(getCommentsCount);
  const handleGetCommentsCount = () => {
    const commentsCountArray = commentsCount? commentsCount.filter((item) => item.id === product.id) : [];
    return commentsCountArray.length === 0 ? '' : commentsCountArray[0].count;
  };


  const handleSetRating = (rating: number, id: number) => {
    const pointIndex = String(rating).indexOf('.');
    let fractionalPart, integerPart;
    const htmlStarIcons = [];

    if (pointIndex === -1){
      fractionalPart = 0;
      integerPart = rating;
    }
    else{
      fractionalPart = Number(String(rating).slice(pointIndex + 1, String(rating).length));
      integerPart = Number(String(rating).slice(0, pointIndex));
    }


    let index = 0;
    while (index < integerPart){
      htmlStarIcons.push(<StarIcon percent = {100} id = {`${index}-${id}`} key={`${index}-${id}`}/>);
      index++;
    }

    if (integerPart !== STARS_COUNT) {
      htmlStarIcons.push(<StarIcon percent = {fractionalPart * 10} id = {`${index}-${id}`} key={`${index}-${id}`}/>);
    }

    for (let i = 0; i < STARS_COUNT - (integerPart + 1); ++i){
      index++;
      htmlStarIcons.push(<StarIcon percent = {0} id = {`${index}-${id}`} key={`${index}-${id}`}/>);
    }

    return htmlStarIcons;

  };

  return(
    <div className="product-card">
      <img src={product.previewImg} width="75" height="190" alt={product.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {handleSetRating(product.rating, product.id)}

          <span className="rate__count">{handleGetCommentsCount()}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoute.Empty}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href={AppRoute.Main}>Купить</a>
      </div>
    </div>
  );
}


export default ProductCard;

