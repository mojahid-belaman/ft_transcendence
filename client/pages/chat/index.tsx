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
			{/* <ParticleBackground/> */}
            <DataContexProvider>
                <Friends />
            </DataContexProvider>
        </MainApp>)
}

export default chat;