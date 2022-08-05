import MainApp from "../../components/main/MainApp";
import Home from "../../components/homeComponents/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";


function chat() {
	const history = useRouter();
	const token = Cookies.get("access_token")
    const tempToken = Cookies.get('2fa_token');

	const authHandler = async () => {
		if(tempToken)
			history.push('/twoFactorAuth')
		else if (token)
			await axios.get("http://localhost:5000/auth/isAuthorized", {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}).then(res => {
					console.log(res);
				})
				.catch(err => {
					history.push("/");
				})
		else
			history.push("/");
	}

	useEffect(() => {
		authHandler();
	}, []);
	return (
		<MainApp>
			<ParticleBackground/>
			<Home />
		</MainApp>)
}

export default chat;