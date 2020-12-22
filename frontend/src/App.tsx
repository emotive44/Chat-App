import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Spinner from './components/common/Spinner';
import axiosConfig from './utils/axiosConfig';
import isAuth from './utils/isAuth';

const Home = lazy(() => import('./components/home/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));


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
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' render={() => <Home isAuth={isLogin} />} />
          <Route path='/login' render={() => <Login loginHandler={setIsLogin} isAuth={isLogin} />} />
          <Route path='/register' render={() => <Register loginHandler={setIsLogin} isAuth={isLogin} />} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
