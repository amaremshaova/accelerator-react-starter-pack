import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchLikeGuitarsAction } from '../../store/api-actions';
import { getLikeProducts } from '../../store/product-data/selectors';

function FormSearch() : JSX.Element{

  const dispatch = useDispatch();
  const likeProducts = useSelector(getLikeProducts);

  const [likeString, setLikeString] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (likeString !== '')
    {
      dispatch(fetchLikeGuitarsAction(likeString));
    }
  }, [dispatch, likeString]);

  return (
    <div className="form-search">
      <form className="form-search__form" data-testid="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use href="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          ref={searchRef}
          className="form-search__input"
          data-testid="search"
          id="search"
          type="text"
          value={ likeString === '' ? '' : searchRef.current?.value}
          autoComplete="off"
          placeholder="что вы ищете?"
          onChange={(evt) => setLikeString(evt.target.value)}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list
        ${(likeProducts && likeProducts.length === 0 )|| likeString === '' ? 'hidden' : ''}`}
      >
        {likeProducts && likeProducts.length !== 0 ? likeProducts.map((product, index) =>
          (
            <li
              className="form-search__select-item"
              tabIndex={-1}
              key={product.id + product.name}
              onClick={()=> setLikeString('')}
            >
              <Link  tabIndex={0} className ="form-search__link-guitar" to={AppRoute.Catalog+product.id}>{product.name}</Link>
            </li>)) : ''}
      </ul>
    </div>
  );
}

export default FormSearch;
