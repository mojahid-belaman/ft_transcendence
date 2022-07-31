import MainApp from "../../components/main/MainApp";
import Home from "../../components/homeComponents/Home";
import { useEffect } from "react";


function chat() {
	useEffect(() => {
		console.log("HELLO");
		
	}, [])
	
	return (
		<MainApp>
			<Home />
		</MainApp>)
}

export default chat;