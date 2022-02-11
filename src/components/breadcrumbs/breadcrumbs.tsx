import { Link } from 'react-router-dom';
import { BreadCrumbsType } from '../../types/breadcrumb';

type BreadCrumbsProps = {
  crumbs: BreadCrumbsType[]
}

function BreadCrumbs({crumbs}: BreadCrumbsProps):JSX.Element{
  return(
    <ul className='breadcrumbs page-content__breadcrumbs'>
      {
        crumbs.map((crumb) =>
          (
            <li className='breadcrumbs__item' key = {crumb.name}>
              <Link className='link' to={crumb.link}>{crumb.name}</Link>
            </li>
          ),
        )
      }
    </ul>
  );
}

export default BreadCrumbs;
