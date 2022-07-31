import axios from 'axios';
import Cookies from 'js-cookie';
import type { NextPage } from 'next'

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'



const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      axios.get(`http://localhost:5000/auth/isAuthorized`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(() => {
        
        router.push('/home')
      })
        .catch(() => router.push('/auth'));
    }
    else {
      router.replace('/auth')
    }
  }, []);

  return (
    <>
    </>
  )
}

export default Home
