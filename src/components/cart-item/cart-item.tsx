import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductsInCartCount} from '../../store/actions';
import { getProductsInCart } from '../../store/app-process/selectors';
import { ProductsInCart } from '../../types/cart';
import { Guitar } from '../../types/guitar';
import { GuitarTypeRU } from '../filters/filters';


enum CountBorders {
  Max = 99,
  Min = 0
}

type CartItemProps = {
  productItem: ProductsInCart;
  onSetActiveProduct: (product: Guitar) => void;
  onSetOpenModalDelete: (open: boolean) => void;
}

function CartItem( {productItem, onSetActiveProduct, onSetOpenModalDelete}: CartItemProps){

  const {product, count} = productItem;

  const [currentCount, setCurrentCount] = useState(count);

  const dispatch = useDispatch();
  const productsInCart =  useSelector(getProductsInCart);
  const countInput = useRef<HTMLInputElement | null>(null);

  const getTotal = () => {
    const productsCount = productsInCart.find((item) => item.product.id === product.id)?.count;

    if (productsCount){
      return productsCount * product.price;
    }
    else {
      return product.price;
    }
  };

  useEffect(() => {
    if (countInput.current){
      countInput.current.value = String(currentCount);
    }

  }, [currentCount]);

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"
        data-testid={'button-delete'}
        onClick={(evt) => {
          evt.currentTarget.blur();
          onSetActiveProduct(product);
          onSetOpenModalDelete(true);
        }}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={product.previewImg} width="55" height="130" alt={product.name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{product.name}</p>
        <p className="product-info__info">Артикул: {product.vendorCode}</p>
        <p className="product-info__info">{GuitarTypeRU[product.type]}, {product.stringCount} струнная</p>
      </div>
      <div className="cart-item__price"> {new Intl.NumberFormat('ru').format(product.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество"
          data-testid={'button-minus'}
          onClick={(evt)=>{
            evt.currentTarget.blur();
            if (currentCount - 1 > CountBorders.Min ) {
              dispatch(changeProductsInCartCount({product: product, count: currentCount - 1}));
              setCurrentCount(currentCount - 1);
            }
            else {
              onSetActiveProduct(product);
              onSetOpenModalDelete(true);
            }
          }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use href="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input"
          type="number"
          id="2-count"
          name="2-count" max="99"
          placeholder={String(currentCount)}
          ref={countInput}
          onFocus={(evt)=>  evt.target.placeholder = ''}
          onBlur={(evt)=>{
            if (Number(evt.target.value) < CountBorders.Max && Number(evt.target.value) > CountBorders.Min) {
              dispatch(changeProductsInCartCount({product: product, count: Number(evt.target.value)}));
              setCurrentCount(Number(evt.target.value));
            }
            if (Number(evt.target.value) === CountBorders.Min || Number(evt.target.value) > CountBorders.Max) {
              evt.target.value = String(currentCount);

            }
          }}
        />
        <button className="quantity__button" aria-label="Увеличить количество"
          data-testid={'button-plus'}
          onClick={(evt)=>{
            evt.currentTarget.blur();
            if (currentCount + 1 <= CountBorders.Max ) {
              dispatch(changeProductsInCartCount({product: product, count: currentCount + 1}));
              setCurrentCount(currentCount + 1);
            }
          }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use href="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total"> {new Intl.NumberFormat('ru').format(getTotal())} ₽</div>
    </div>
  );
}

export default CartItem;
