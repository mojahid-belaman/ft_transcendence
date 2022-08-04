import axios from 'axios'
import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MainApp from '../components/main/MainApp'

const Home: NextPage = () => {
  const history = useRouter();
  const [user, setUser] = useState({});

	const authHandler = async () => {
		const token = Cookies.get("access_token")
		if (token)
			await axios.get("http://localhost:5000/auth/isAuthorized", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}).then(res => {
				setUser({...res});
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
