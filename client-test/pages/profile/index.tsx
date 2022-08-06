import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";
import MainApp from "../../components/main/MainApp";
import Profile from "../../components/profileComponents/Profile";


function ProfilePage() {

    const history = useRouter();
	const authHandler = async () => {
		const token = Cookies.get("access_token")
		if (token)
			await axios.get("http://localhost:5000/auth/isAuthorized", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}).then(res => res)
			.catch(() => history.push("/login"))
		else
			history.push("/login")
	}

	useEffect(() => {
		authHandler();
	}, []);

    return (
        <MainApp>
                <Profile />
        </MainApp>) 
}

export default ProfilePage;
