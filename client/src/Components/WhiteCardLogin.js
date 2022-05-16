import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './WhiteCard.css'
// import PropTypes from 'prop-types'

const WhiteCardLogin = (props) => {
  
  const history = useHistory()
  const inputName = useRef();
  const  inputPassword = useRef()
  const submitHandler = async (e) => {
    e.preventDefault();
    const data ={
      username: inputName.current.value,
      password: inputPassword.current.value
    }
    // await fetch(`http://localhost:5000/auth/login`, {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(res => res.json())
    //   .then(r => {
    //     console.log(r)
    //     if (r.hasOwnProperty("access_token")) {
    //       document.cookie = `access_token=${r.access_token}`;
    //       history.push("/")
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    await axios.post(`http://localhost:5000/auth/login`, data)
    .then(res => {
      if (res.data.hasOwnProperty("access_token")) {
              document.cookie = `access_token=${res.data.access_token}`;
              history.push("/")
      }
      console.log(res.data);
    })
    .catch(err => {
      
    });
  }
  return (
    <form className='whiteCard' onSubmit={submitHandler}>
        <p>Transcendance</p>
        <div className='inputFileds'>
            <input type="username" name="username" id="username" placeholder="Username" ref={inputName} />
            <input type="password" name="password" id="password" placeholder="Password" ref={inputPassword}/>
        </div>
        <input type="submit" value="Connect" className="button" />
        <Link to="/auth/register" className="redirection">You dont have an account?</Link>
    </form>
  )
}

// WhiteCardLogin.propTypes = {}

export default WhiteCardLogin
