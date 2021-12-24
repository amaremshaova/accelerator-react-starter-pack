import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';


function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Catalog}>
        <Catalog />
      </Route>
    </Switch>
  );
}

export default App;
