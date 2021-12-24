import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function BreadCrumbs():JSX.Element{
  return(
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Main}>Главная</Link>
      </li>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Catalog} >Каталог</Link>
      </li>
    </ul>
  );
}

export default BreadCrumbs;
