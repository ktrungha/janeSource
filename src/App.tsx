import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ResultSummary from './pages/ResultSummary';
import Detail from './pages/Detail';
import { ROUTES } from './constants';
import Form from './pages/Form';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={ResultSummary} />
      <Route exact path={ROUTES.detail.value} component={Detail} />
      <Route exact path={ROUTES.form} component={Form} />
    </Switch>
  );
}

export default App;
