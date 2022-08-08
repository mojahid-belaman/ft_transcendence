import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LiveGame from "../../components/gameComponents/LiveGame";
import MainApp from "../../components/main/MainApp";

export function Home(props: any) {
  const history = useRouter();
	const token = Cookies.get("access_token");
	const tempToken = Cookies.get('2fa_token');
	
	const authHandler = async () => {
		if(tempToken)
				history.push('/twoFactorAuth')
		else if (token)
			  await axios.get(`${process.env.BACK_END_URI}/auth/isAuthorized`, {
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
      <LiveGame />
    </MainApp>
  );
}

export default Home;
