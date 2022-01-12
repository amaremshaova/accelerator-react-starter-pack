import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Main(): JSX.Element{
  return (
    <main className="container-index main-index">
      <img className="logo__main-img" src="./img/svg/logo.svg" width="300" alt="Логотип проекта"/>
      <h1 className="main-title">Список страниц</h1>
      <ol className="list-index">
        <li className="item-index"><Link className="link-index" to={AppRoute.Empty}>UI-kit</Link></li>
        <li className="item-index"><Link className="link-index" to={AppRoute.StartPage} >Каталог</Link></li>
        <li className="item-index"><Link className="link-index" to={AppRoute.Cart}>Корзина</Link></li>
        <li className="item-index"><Link className="link-index" to={AppRoute.Guitar}>Товар</Link></li>
      </ol>
    </main>

  );
}

export default Main;
