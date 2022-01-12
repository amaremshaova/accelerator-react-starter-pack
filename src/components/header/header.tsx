import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FormSearch from '../form-search/form-search';


function Header():JSX.Element{

  return(
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Main}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link" to={AppRoute.StartPage}>Каталог</Link>
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

        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use href="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
