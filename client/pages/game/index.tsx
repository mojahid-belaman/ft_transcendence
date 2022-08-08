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
	console.log(
		"index game"
	);
  return (
    <>
      <ParticleBackground/>
      <HomeGame />
    </>

  );
}

export default PingPong;
