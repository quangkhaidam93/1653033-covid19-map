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
      <section className="Navigation">
        <Link to="/" onClick={handleActive} className="Link">
          <LinkContainer active={activeLinks.link1}>Covid19 Map</LinkContainer>
        </Link>
        <Link to="/stats" onClick={handleActive} className="Link">
          <LinkContainer active={activeLinks.link2}>Covid19 Stats</LinkContainer>
        </Link>
      </section>

      <section className="Content">
        <Switch>
          <Route path='/stats'>
            <CovidStats />
          </Route>
          <Route path='/'>
            <CovidMap />
          </Route>
        </Switch>
      </section>
    </Router>  
  );
}

export default App;
