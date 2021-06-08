import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { GlobalStyle, Wrapper } from "./App.styles";
import GameStart from './components/GameStart';
import ChooseCategory from './components/ChooseCategory';
import ChooseLevel from './components/ChooseLevel';


function App() {
 
  return (
    <Router>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        <Switch>
          <Route  path="/" exact component={ChooseCategory} />
          <Route  path="/:category" exact component={ChooseLevel} />
          <Route  path="/:category/:level" component={GameStart} />
        </Switch>
      </Wrapper>
    </Router>
     
  );
}
export default App;
