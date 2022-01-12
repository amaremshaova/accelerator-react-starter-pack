import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitarsCount } from '../../store/guitar-data/selectors';
import { COUNT_CARDS } from '../catalog/catalog';


type PaginationProps = {
  pageActive: number,
  onSetPage: (id: number) => void
}

const COUNT_PAGES = 3;
const SCROLL_TO_Y = 325;

function Pagination(props: PaginationProps):JSX.Element{

  const guitarsCount = useSelector(getGuitarsCount);

  const {pageActive, onSetPage} = props;
  const pagesCount = Math.ceil(guitarsCount / COUNT_CARDS);

  const location = useLocation();
  const history = useNavigate();


  const hangleSetStartPage = () =>{
    if ((pageActive % COUNT_PAGES) === 0){
      return pageActive - 2;
    }
    return Math.floor(pageActive / COUNT_PAGES) * COUNT_PAGES + 1;
  };

  const [startPage, setStartPage] = useState(hangleSetStartPage);

  return(
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (pageActive > 1 && pageActive <= pagesCount) ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href={AppRoute.Empty}
                onClick={(evt) => {
                  evt.preventDefault();
                  window.scrollTo(0,SCROLL_TO_Y);
                  history(`${AppRoute.Page + (pageActive - 1)  }/${  location.search}`);
                  onSetPage(pageActive - 1);
                  if (pageActive === startPage){
                    setStartPage( pageActive - 3);
                  }
                }}
              >Назад
              </a>
            </li> : ''
        }

        {
          startPage <= pagesCount ?
            <li className={`pagination__page ${pageActive === startPage ? 'pagination__page--active' : ''}`}>
              <a className="link pagination__page-link" href ={AppRoute.Empty}
                onClick={(evt) => {
                  evt.preventDefault();
                  window.scrollTo(0,SCROLL_TO_Y);
                  history(`${AppRoute.Page + startPage  }/${  location.search}`);
                  onSetPage(startPage);
                }}
              >{startPage}
              </a>
            </li> : ''
        }
        {
          startPage + 1 <= pagesCount ?
            <li className={`pagination__page ${pageActive === startPage + 1 ? 'pagination__page--active' : ''}`}>
              <a className="link pagination__page-link" href ={AppRoute.Empty}
                onClick={(evt) => {
                  evt.preventDefault();
                  window.scrollTo(0,SCROLL_TO_Y);
                  history(`${AppRoute.Page + (startPage + 1)  }/${  location.search}`);
                  onSetPage(startPage + 1);
                }}
              >{startPage + 1}
              </a>
            </li> : ''
        }
        {
          startPage + 2 <= pagesCount?
            <li className={`pagination__page ${pageActive === startPage + 2 ? 'pagination__page--active' : ''}`}>
              <a className="link pagination__page-link" href ={AppRoute.Empty}
                onClick={(evt) => {
                  evt.preventDefault();
                  window.scrollTo(0,SCROLL_TO_Y);
                  history(`${AppRoute.Page + (startPage + 2)  }/${  location.search}`);
                  onSetPage(startPage + 2);
                }}
              >{startPage + 2}
              </a>
            </li> : ''
        }
        {
          pageActive + 1 <= pagesCount ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href ={AppRoute.Empty}
                onClick={(evt) => {
                  evt.preventDefault();
                  window.scrollTo(0,SCROLL_TO_Y);
                  history(`${AppRoute.Page + (pageActive + 1)  }/${  location.search}`);
                  onSetPage(pageActive + 1);
                  if (pageActive === startPage + 2){
                    setStartPage(pageActive + 1);
                  }
                }}
              >Далее
              </a>
            </li> : ''
        }

      </ul>
    </div>
  );
}

export default Pagination;
