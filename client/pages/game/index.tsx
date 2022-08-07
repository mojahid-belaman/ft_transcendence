import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HomeGame } from "../../components/gameComponents/HomeGame";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";

export function PingPong(props: any) {
	const history = useRouter();
	const token = Cookies.get("access_token");
	const tempToken = Cookies.get('2fa_token');
	
	const authHandler = async () => {
		if(tempToken)
				history.push('/twoFactorAuth')
		if (token)
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
    <div>
		<ParticleBackground/>
    	<HomeGame />
    </div>
  );
}

export default PingPong;
