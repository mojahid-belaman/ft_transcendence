import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import ParticleBackground from '../../components/gameComponents/ParticleBackground';
import TwoFactAuth from '../../components/twoFactorAuthComponent/TwoFactAuth'

export default function twoFactorAuth() {
  const history = useRouter();
	const token = Cookies.get("access_token")
    const tempToken = Cookies.get('2fa_token');

    const authHandler = async () => {
      if(!tempToken)
        history.push('/')
      else if (token)
        await axios.get(`${process.env.BACK_END_URI}/auth/isAuthorized`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
          }).then(res => history.push("/home"))
          .catch(err => {
            history.push("/");
          })
      else
        history.push('/twoFactorAuth');
      }


	useEffect(() => {
		authHandler();
	}, []);
  return (
    <>
      <ParticleBackground/>
      <TwoFactAuth/>
    </>
  )
}
