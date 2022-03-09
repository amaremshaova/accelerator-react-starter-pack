import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDiscount } from '../../store/actions';
import { addCouponAction } from '../../store/api-actions';
import { getDiscount, getProductsInCart } from '../../store/app-process/selectors';
import { Coupon } from '../../types/coupon';


const CONST_FOR_DISCOUNT = 100;
const INITIAL_DISCOUNT = 0;

function CartFooter(){

  const productsInCart = useSelector(getProductsInCart);

  const getTotal = () => {
    let total = 0;
    productsInCart.forEach((item) => total += item.product.price * item.count);

    return total;
  };

  const discount = useSelector(getDiscount) * getTotal() / CONST_FOR_DISCOUNT;

  const [successCoupon, setSuccessCoupon] = useState<boolean | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const  dispatch = useDispatch();

  const submitRef = useRef<HTMLButtonElement | null>(null);
  const couponInput = useRef<HTMLInputElement | null>(null);

  const getSuccessMessage = () => {

    switch (successCoupon){
      case null: {
        return '';
      }
      case true: {
        return <p className="form-input__message form-input__message--success">Промокод принят</p>;
      }
      case false: {
        return <p className="form-input__message form-input__message--error">неверный промокод</p>;
      }

    }
  };

  return (
    <div className="cart__footer">
      <div className="cart__coupon coupon">
        <h2 className="title title--little coupon__title">Промокод на скидку</h2>
        <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
        <form className="coupon__form" id="coupon-form" method="post"
          onSubmit={(evt) => {
            evt.preventDefault();
            if (coupon !== null && successCoupon !== false){
              dispatch(addCouponAction({coupon: coupon}));
              dispatch(addDiscount(0));
              setSuccessCoupon(null);
            }
            submitRef.current?.blur();
          }}
        >
          <div className="form-input coupon__input">
            <label className="visually-hidden">Промокод</label>
            <input
              type="text"
              placeholder="Введите промокод"
              id="coupon"
              name="coupon"
              ref={couponInput}
              onBlur={(evt) => {
                if (!Object.values(Coupon).includes(evt.target.value.replace(/ /g, '') as Coupon)){
                  setSuccessCoupon(false);
                }
                else {
                  setSuccessCoupon(true);
                  setCoupon(evt.target.value.replace(/ /g, '') as Coupon);
                }
              }}
            />
            {
              getSuccessMessage()
            }
          </div>
          <button className="button button--big coupon__button" ref={submitRef}>
            Применить
          </button>
        </form>
      </div>
      <div className="cart__total-info">
        <p className="cart__total-item">
          <span className="cart__total-value-name">Всего:</span>
          <span className="cart__total-value">{new Intl.NumberFormat('ru').format(getTotal())} ₽</span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">Скидка:</span>
          <span className={`cart__total-value ${discount === INITIAL_DISCOUNT ? '' : 'cart__total-value--bonus'}`}>
            {discount === INITIAL_DISCOUNT ? INITIAL_DISCOUNT : `-
            ${new Intl.NumberFormat('ru').format(discount)}` } ₽
          </span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">К оплате:</span>
          <span className="cart__total-value cart__total-value--payment">
            {new Intl.NumberFormat('ru').format(getTotal() - discount)} ₽
          </span>
        </p>
        <button className="button button--red button--big cart__order-button"
          onClick={(evt)=> evt.currentTarget.blur()}
        >
            Оформить заказ
        </button>
      </div>
    </div>
  );
}


export default CartFooter;
