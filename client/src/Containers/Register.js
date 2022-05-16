import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WhiteCardRegister from '../Components/WhiteCardRegister'
import "./Authentication.css"
// import background from '../assests/images/filipp-romanovski-s_sjvwb1vV8-unsplash.png'


const Register = () => {
  const history = useHistory();
  useEffect(() => {
    if (document.cookie) {
      history.replace('/')
    }
  }, [])
  return (
    <div className='loginBackground'>
      <WhiteCardRegister />
    </div>
  )
}

export default Register