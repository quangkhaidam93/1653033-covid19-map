import React from 'react';
import './App.scss';
import CovidMap from './components/covid-map/CovidMap';
import CovidStats from './components/covid-stats/CovidStats';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/stats'>
          <CovidStats />
        </Route>
        <Route exact path='/'>
          <CovidMap />
        </Route>
        <Route><div>Page Not Found</div></Route>
      </Switch>
    </Router>  
  );
}

export default App;
