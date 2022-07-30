import classes from './App.module.css'
import MainApp from './main/MainApp';
import Auth from './Auth'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { SocketContexProvider } from './main/navigationbar/data_context/socket-context';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


function App() {
  const history = useHistory();

  const [token, setToken] = useState("")

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      axios.get(`http://localhost:5000/auth/check`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }).then(() => {
          history.replace('/')
          setToken(token)
        })
        .catch(() => history.push('/auth'));
    }
    else 
      history.replace('/auth')
  },[]);

  return (
    <div className={classes.App}>
      <Switch>
        {/* <Route path="/auth">
          <Auth />
        </Route> */}
        <Route path="/">
          {/* <SocketContexProvider token={token}> */}
            <MainApp />
          {/* </SocketContexProvider> */}
        </Route>
      </Switch>
      {/* <MainApp /> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
