import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage():JSX.Element{
  return(
    <div>
      <h1> 404.Page not found
      </h1>
      <Link to={AppRoute.Main} className="not-found-page__link">Вернуться на главную</Link>
    </div>);
}

export default NotFoundPage;
