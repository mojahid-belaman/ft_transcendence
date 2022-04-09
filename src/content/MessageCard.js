
function MessageCard(props){
	return(
		<div className="message-card" >
						<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

						<div className="info">
							<div className="name-date">
								<div>knabouss</div>
								<div style={{ color: "gray" }}> — Aujourd’hui à 12:44</div>
							</div>
							<div>{props.message}</div>
						</div>

					</div>
	)
}
export default MessageCard