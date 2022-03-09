import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getProductsInCart } from '../../store/app-process/selectors';
import { getCommentsCount } from '../../store/product-data/selectors';
import { Guitar } from '../../types/guitar';
import Rating from '../rating/rating';

type ProductCardProps = {
  product: Guitar;
  onSetActiveProduct: (product: Guitar)=> void;
  onSetOpenModalAdd: (open: boolean)=> void;
}

const enum RatingProperty {
  Width = 12,
  Height = 11
}

function ProductCard({product, onSetActiveProduct, onSetOpenModalAdd}: ProductCardProps):JSX.Element{

  const commentsCount = useSelector(getCommentsCount);

  const history = useNavigate();
  const productsInCart = useSelector(getProductsInCart);
  const handleGetCommentsCount = () => {
    const commentsCountArray = commentsCount? commentsCount.filter((item) => item.id === product.id) : [];
    return commentsCountArray.length === 0 ? '' : commentsCountArray[0].count;
  };

  const isInCart = productsInCart.find((item)=> item.product.id === product.id) !== undefined;

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
        <a className={`button button--mini ${productsInCart.find((item)=> item.product.id === product.id)
          ? 'button--red-border button--in-cart'
          :'button--red  button--add-to-cart'}`}
        href={AppRoute.Empty}
        onClick={(evt)=>{
          evt.preventDefault();
          if (isInCart) {
            history(AppRoute.Cart);
          }
          else{
            onSetOpenModalAdd(true);
            onSetActiveProduct(product);
            evt.currentTarget.blur();
          }
        }}
        >{isInCart ? 'В корзине' : 'Купить'}
        </a>
      </div>
    </div>
  );
}


export default ProductCard;

