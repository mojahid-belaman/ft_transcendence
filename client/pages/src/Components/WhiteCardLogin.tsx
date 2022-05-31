import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import classes from './WhiteCard.module.css'
import Cookies from 'js-cookie';
// import PropTypes from 'prop-types'

const WhiteCardLogin = (props:any) => {
  
  const history = useHistory()
  const inputName :any= useRef();
  const  inputPassword:any = useRef()
  const submitHandler = async (e:any) => {
    e.preventDefault();
    const data ={
      username: inputName.current.value,
      password: inputPassword.current.value
    }
    await axios.post(`http://localhost:5000/auth/login`, data)
    .then(res => {
      if (res.data.hasOwnProperty("access_token")) {
              Cookies.set('access_token', res.data.access_token)
              history.push("/")
      }
      console.log(res.data);
    })
    .catch(err => {
      
    });
  }
  return (
    <form className={classes.whiteCard} onSubmit={submitHandler}>
        <p>Transcendance</p>
        <div className={classes.inputFileds}>
            <input type="username" name="username" id="username" placeholder="Username" ref={inputName} />
            <input type="password" name="password" id="password" placeholder="Password" ref={inputPassword}/>
        </div>
        <input type="submit" value="Connect" className={classes.button} />
        <Link to="/auth/register" className={classes.redirection}>You dont have an account?</Link>
    </form>
  )
}

// WhiteCardLogin.propTypes = {}

export default WhiteCardLogin
