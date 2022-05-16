import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WhiteCardLogin from '../Components/WhiteCardLogin'
import "./Authentication.css"
// import background from '../assests/images/filipp-romanovski-s_sjvwb1vV8-unsplash.png'


const Login = (props) => {

  const history = useHistory();

  useEffect(() => {
    if (document.cookie) {
      history.replace('/')
    }
  }, [])
  return (
    <div className='loginBackground'>
      <WhiteCardLogin />
    </div>
  )
}

export default Login