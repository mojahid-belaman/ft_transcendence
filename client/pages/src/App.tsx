import classes from './App.module.css'
import MainApp from './main/MainApp';
import Auth from './Auth'
import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token)
      history.replace('/auth')
    else 
    {
      setIsLoggedIn(true);
      history.replace('/')
    }
  });

  return (
    <div className={classes.App}>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <MainApp isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
