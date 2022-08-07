import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import ParticleBackground from "../../components/gameComponents/ParticleBackground";

import MainApp from "../../components/main/MainApp";
import Profile from "../../components/profileComponents/Profile";


function chat() {

	const history = useRouter();
	const token = Cookies.get("access_token");
	const tempToken = Cookies.get('2fa_token');
	
	const authHandler = async () => {
		if(tempToken)
				history.push('/twoFactorAuth')
		else if (token)
			  await axios.get("http://localhost:5000/auth/isAuthorized", {
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
			{/* <ParticleBackground/> */}
                <Profile />
        </MainApp>) 
}

export default chat;