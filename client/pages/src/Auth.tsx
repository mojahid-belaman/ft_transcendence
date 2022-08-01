import classes from './Auth.module.css';
import Login from './Containers/Login';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Register from './Containers/Register';
import { useEffect } from 'react';

const Auth = () => {


  return (
    <div className={classes.Auth}>
      <Switch>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
      </Switch>
      <Redirect from='/' to='/auth/login' />
    </div>
    
  );
}

export default Auth;