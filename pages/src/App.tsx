import classes from './App.module.css'
import MainApp from './main/MainApp';
import Auth from './Auth'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  const history = useHistory();
  useEffect(() => {
    if (document.cookie)
      history.replace('/')
    else 
      history.replace('/auth')
  },);

  return (
    <div className={classes.App}>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <MainApp />
        </Route>
      </Switch>
      {/* <MainApp /> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
