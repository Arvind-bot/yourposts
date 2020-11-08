import React from "react";

import './App.scss';
import LoginPage from './pages/loginpage/loginpage.component';
import UserPostsPage from "./pages/userpostspage/userpostspage.component";

import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <div>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/userposts" component={UserPostsPage}/>
    </Switch>
    </div>
  );
}

export default App;
