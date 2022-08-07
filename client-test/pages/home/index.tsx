import MainApp from "../../components/main/MainApp";
import Home from "../../components/homeComponents/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

function HomePage() {
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
			.catch(() => {
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
			<Home />
		</MainApp>)
}

export default HomePage;
