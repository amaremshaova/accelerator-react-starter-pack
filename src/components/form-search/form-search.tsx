import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchLikeGuitarsAction } from '../../store/api-actions';
import { getLikeGuitars } from '../../store/guitar-data/selectors';

function FormSearch() : JSX.Element{

  const dispatch = useDispatch();
  const likeGuitars = useSelector(getLikeGuitars);

  const [likeString, setLikeString] = useState('');

  useEffect(() => {
    if (likeString !== '')
    {
      dispatch(fetchLikeGuitarsAction(likeString));
    }
  }, [dispatch, likeString]);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use href="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищете?"
          onChange={(evt) => setLikeString(evt.target.value)}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list
        ${likeGuitars.length === 0 || likeString === '' ? 'hidden' : ''}`}
      >
        { likeGuitars.length !== 0 ? likeGuitars.map((guitar) =>
          (<li className="form-search__select-item"  tabIndex={0} key={guitar.id + guitar.name}><Link className ="form-search__link-guitar" to={AppRoute.Guitar+guitar.id}>{guitar.name}</Link></li>)) : ''}
      </ul>
    </div>
  );
}

export default FormSearch;
