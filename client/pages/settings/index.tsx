import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import ParticleBackground from '../../components/gameComponents/ParticleBackground'
import MainApp from '../../components/main/MainApp'
import SettingsComponent from '../../components/SettingsComponents/settings'

export default function Settings() {
  const history = useRouter();
	const token = Cookies.get("access_token")

	const authHandler = async () => {
    if (token)
		await axios.get("http://localhost:5000/auth/isAuthorized", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
			}).then(res => {
				// console.log(res);
			})
			.catch(err => {
			  history.push("/");
			})
    else
      history.push('/');
	}

	useEffect(() => {
		authHandler();
	}, []);
  return (
    <MainApp>
      <ParticleBackground/>
      <SettingsComponent/>
    </MainApp>
  )
}