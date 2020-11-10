import React from "react";

import './App.scss';
import LoginPage from './pages/loginpage/loginpage.component';
import UserPostsPage from "./pages/userpostspage/userpostspage.component";

import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

function App({currentUser}) {
  return (
    <div>
    <Switch>
      <Route exact path="/" render={()=>currentUser?(<UserPostsPage/>):(<LoginPage/>)}/>
    </Switch>
    </div>
  );
}

const mapStateToProps=({user})=>({currentUser:user.currentUser});

export default connect(mapStateToProps)(App);
