import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import axiosConfig from './utils/axiosConfig';
import isAuth from './utils/isAuth';


function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axiosConfig();

    setIsLogin(isAuth());
  }, []);

  return (
    <Router>
      <Navbar isAuth={isLogin} logoutHandler={() => setIsLogin(false)} />
      <Switch>
        <Route exact path='/' render={() => <Home isAuth={isLogin} />} />
        <Route path='/login' render={() => <Login loginHandler={setIsLogin} isAuth={isLogin} />} />
        <Route path='/register' render={() => <Register loginHandler={setIsLogin} isAuth={isLogin} />} />
      </Switch>
    </Router>
  );
}

export default App;
