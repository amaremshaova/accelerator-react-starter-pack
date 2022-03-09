import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getProductsInCart } from '../../store/app-process/selectors';
import FormSearch from '../form-search/form-search';


function Header():JSX.Element{

  const productsInCart = useSelector(getProductsInCart);


  let totalCount = 0;
  productsInCart.forEach((item) => {
    totalCount += item.count;
  });

  return(
    <header
      className="header"
      id="header"
    >
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Main}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link" to={AppRoute.CatalogStartPage}>Каталог</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to={AppRoute.Empty}>Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to={AppRoute.Empty}>О компании</Link>
            </li>
          </ul>
        </nav>
        <FormSearch/>

        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина"
          onClick={(evt)=> evt.currentTarget.blur()}
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use href="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {
            totalCount !== 0 ?
              <span className="header__cart-count">{totalCount}</span>
              : ''
          }

        </Link>
      </div>
    </header>
  );
}

export default Header;
