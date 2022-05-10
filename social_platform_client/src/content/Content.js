import { useState } from "react";
import "./Content.css"
import MessageCard from "./MessageCard";

function Content(props) {
	const [messagelist, setMessageList] = useState([]);
	const [CurentMessage, setCurentMessage] = useState("");
	function Message(){
		setMessageList((list) => [...list, CurentMessage])
		setCurentMessage("")
	}
	return (
		<main className="content">
			<div className="content-bar">
				<h3 className="inner-html">{props.channel}</h3>
			</div>
			<div className="content-chat">
				{messagelist.map((message)=>(
					<MessageCard message={message}/>
				))}
				
			</div>
			<div className="chat-footer">
				<input type="text" value={CurentMessage} placeholder="Hey..." onChange={(event) => {
					setCurentMessage(event.target.value);
				}} onKeyPress={(event) => {
					if (event.key === "Enter") {
						Message();
					};
				}} />
				<button onClick={Message }>&#9658;</button>
			</div>
		</main>
	);
}
export default Content;