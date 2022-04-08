import { useState } from "react";
import Content from "../content/Content";
import SideBar from "../sidebar/SideBar";
import "./MainCard.css";
function MainCard() {
	const [channel, setChannel] = useState("#test")
	return (
		<div className="mainContainer">
			<SideBar channelSetter={setChannel} />
			<Content channel={channel}/>
		</div>
	);
}
export default MainCard;
