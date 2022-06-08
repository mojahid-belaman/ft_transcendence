import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import classes from './WhiteCard.module.css'
import Cookies from 'js-cookie';
// import PropTypes from 'prop-types'

const WhiteCardRegister = () => {

  const history = useHistory();
  const [error, setError] = useState("")
  const inputName:any = useRef();
  const inputName42:any = useRef();
  const  inputPassword:any = useRef()
  const  inputConfirmPassword:any = useRef()


  // useEffect(() => {
  //   console.log(document.cookie);
  // }, []);

  const submitHandler = async (e:any) => {
    e.preventDefault()
    const enteredName= inputName.current.value 
    const enteredName42= inputName42.current.value 
    const  enteredPassword= inputPassword.current.value 
    const  enteredConfirmPassword= inputConfirmPassword.current.value 
    if (enteredConfirmPassword !== enteredPassword)
      setError("Passwords not matched")
    else {
      const data ={
        username: enteredName,
        password: enteredPassword,
        username42: enteredName42
      }
      await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(r => {
        console.log(r)
        if (r.hasOwnProperty("access_token")) {
          Cookies.set('access_token', r.access_token)
          history.push("/")
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  return (
    <form className={classes.whiteCard} onSubmit={submitHandler}>
        <p className={classes.title}>Transcendance</p>
        <p className={classes.errorMessage}>{error}</p>
        <p></p>
        <div className={classes.inputFileds}>
            <input type="text" name="username" id="username" placeholder="Username"  ref={inputName}/>
            <input type="text" name="username42" id="username42" placeholder="Username 42"  ref={inputName42}/>
            <input type="password" name="password" id="password" placeholder="Password"  ref={inputPassword}/>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"  ref={inputConfirmPassword}/>
        </div>
        {/* <button>S'ENEGISTRER</button> */}
        <input type="submit" value="Register" className={classes.button} />
        <Link className={classes.redirection} to="/auth/login">You want to log in?</Link>
    </form>
  )
}

// WhiteCardRegister.propTypes = {}

export default WhiteCardRegister
