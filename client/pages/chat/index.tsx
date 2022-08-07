import Friends from "../../components/chatComponents/Friends";
import MainApp from "../../components/main/MainApp";
import { DataContexProvider } from '../../components/chatComponents/data_context/data-context';
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";

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
            <DataContexProvider >
                <Friends />
            </DataContexProvider>
        </MainApp>)
}

export default chat;