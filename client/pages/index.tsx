
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, {useEffect } from 'react'
import ParticleBackground from '../components/gameComponents/ParticleBackground'
import LoginComponent from '../components/loginComponent/login'

export default function index() {
  	const history = useRouter();
	const token = Cookies.get("access_token")
    const tempToken = Cookies.get('2fa_token');

	const authHandler = async () => {
		if(tempToken)
			history.push('/twoFactorAuth')
		else if (token)
		{
			await axios.get(`${process.env.BACKEND_URL}/auth/isAuthorized`, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}).then(res => {
					history.push('/home');
				})
				.catch(err => {
					history.push("/");
				})
		}
		else
			history.push("/");
	}

	useEffect(() => {
		authHandler();
	}, []);
  return (
	<>
		<ParticleBackground/>
    	<LoginComponent/>
    </>
  )
}
