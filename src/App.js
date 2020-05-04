import React, {useState} from 'react';
import './App.scss';
import CovidMap from './components/covid-map/CovidMap';
import CovidStats from './components/covid-stats/CovidStats';
import LinkContainer from './components/LinkContainer/LinkContainer';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const App = (props) => {
  const [activeLinks, setActiveLinks] = useState({link1: true, link2: false});

  const handleActive = () => {
    setActiveLinks({link1: !activeLinks.link1, link2: !activeLinks.link2})
  }

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
