import { useState } from "react";
import "./App.css";
import Login from "./login/Login";
import MainCard from "./navigation/MainCard";
function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	return (
		<div >
			{/* <Login setterUsername={setUsername} setterRoom={setRoom} /> */}
			<MainCard />
		</div>
	);
}

export default App;
