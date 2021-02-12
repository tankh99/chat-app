import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ChatPage from './pages/chat/ChatPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';


function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to={"/home"}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/chat/:id" component={ChatPage}/>
      </Switch>
    </Router>
  );
}

export default App;
