import axios from 'axios'
import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MainApp from '../components/main/MainApp'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const history = useRouter();

	const authHandler = async () => {
		const token = Cookies.get("access_token")
		if (token)
			await axios.get("http://localhost:5000/auth/isAuthorized", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}).then(res => {
				console.log(res);
			})
			.catch(err => {
			history.push("/login")
			})
		else
			history.push("/login")
	}

	useEffect(() => {
		authHandler();
	}, []);
  return (
    <MainApp>
      
    </MainApp>
  )
}

export default Home
