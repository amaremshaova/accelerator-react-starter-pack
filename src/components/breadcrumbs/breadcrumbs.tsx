import { Link } from 'react-router-dom';
import { BreadCrumbsType } from '../../types/breadcrumb';

type BreadCrumbsProps = {
  crumbs: BreadCrumbsType[]
}

function BreadCrumbs({crumbs}: BreadCrumbsProps):JSX.Element{
  return(
    <ul className='breadcrumbs page-content__breadcrumbs'>
      {
        crumbs.map((crumb, index) =>
          (
            <li className='breadcrumbs__item' key = {crumb.name} >
              <Link className='link' to={crumb.link} tabIndex={0}>{crumb.name}</Link>
            </li>
          ),
        )
      }
    </ul>
  );
}

export default BreadCrumbs;
