import MainApp from "../../components/main/MainApp";
import Home from "../../components/homeComponents/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

function HomePage() {
	const history = useRouter();
	const token = Cookies.get("access_token");
	const tempToken = Cookies.get('2fa_token');
	
	const authHandler = async () => {
		if(tempToken)
				history.push('/twoFactorAuth')
		else if (token)
			  await axios.get(`${process.env.BACKEND_URL}/auth/isAuthorized`, {
				  headers: {
					  Authorization: `Bearer ${token}`,
				  }
				  }).then(() => {
					  return;
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
			<Home />
		</MainApp>)
}

export default HomePage;
