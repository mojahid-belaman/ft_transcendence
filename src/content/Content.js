import "./Content.css"
import MessageCard from "./MessageCard";

function Content(props){
		return(
			<main className="content">
				<div className="content-bar">
					<h3 className="inner-html">{props.channel}</h3>
				</div>
				<div className="content-chat">
					<MessageCard/> 
				</div>
				<div className="chat-footer">
					<input />
					<button>&#9658;</button>
				</div>
			</main>
		);
}
export default Content;