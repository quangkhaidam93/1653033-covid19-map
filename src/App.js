import React from 'react';
import './App.scss';
import CovidMap from './components/covid-map/CovidMap';
import CovidStats from './components/covid-stats/CovidStats';
import {HashRouter, Switch, Route} from 'react-router-dom';

const App = (props) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/stats'>
          <CovidStats />
        </Route>
        <Route exact path='/'>
          <CovidMap />
        </Route>
        <Route><div className="PNF">Page Not Found</div></Route>
      </Switch>
    </HashRouter>  
  );
}

export default App;
