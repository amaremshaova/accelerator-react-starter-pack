import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';

type ProductCardProps = {
  product: Guitar;
}

function ProductCard({product}: ProductCardProps):JSX.Element{
  return(
    <div className="product-card">
      <img src={`${product.previewImg}`} width="75" height="190" alt={product.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use href="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use href="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use href="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use href="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use href="#icon-star"></use>
          </svg><span className="rate__count">{product.rating}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to="#">Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}


export default ProductCard;

