import { useState } from "react";
import { Route, Switch} from "react-router";
import Content from "../content/Content";
import SideBar from "../sidebar/SideBar";
import "./MainCard.css";
const DUMMY = ["General", "Announcements", "Music", "Random"]
function MainCard() {
	const [channel, setChannel] = useState("")
	return (
		<div className="mainContainer">
			<SideBar channelSetter={setChannel} data={DUMMY} />
			<Switch>
				<Route path='/' exact>
					<div>hello</div>
				</Route>
				{DUMMY.map((data) => (
					<Route path={"/" + data}>
						<Content channel={channel} />
					</Route>
				))}
			</Switch>
		</div>
	);
}
export default MainCard;
