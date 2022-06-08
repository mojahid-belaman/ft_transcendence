import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WhiteCardLogin from '../Components/WhiteCardLogin'
import classes from "./Authentication.module.css"
// import background from '../assests/images/filipp-romanovski-s_sjvwb1vV8-unsplash.png'


const Login = (props:any) => {

  const history = useHistory();

  useEffect(() => {
    if (document.cookie) {
      history.replace('/')
    }
  }, [])
  return (
    <div className={classes.loginBackground}>
      <WhiteCardLogin />
    </div>
  )
}

export default Login