import "./MainCard.css";
function MainCard() {
	return (
		<div className="mainContainer">
			<div className="sidebar">
				<div>
					<img src="https://i.pinimg.com/736x/70/09/1c/70091c4cd9d4cdfb79ecdcf198205c20.jpg"></img>
				</div>
				<div className="content-bar">
					<h3>Channels</h3>
				</div>
				<button ><div className="inner-html">#General</div></button>
				<button><div className="inner-html">#Announcements</div></button>
				<button><div className="inner-html">#Music</div></button>
				<button><div className="inner-html">#Random</div></button>
			</div>

			<main className="content">
				<div className="content-bar">
					<h3 className="inner-html">#General</h3>
				</div>
				<div className="content-chat">
					<div className="message-card" >
						<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

						<div className="info">
							<div className="name-date">
								<div>shikma</div>
								<div style={{ color: "gray" }}> — Aujourd’hui à 12:44</div>
							</div>
							<div>this is a message from shikma</div>
						</div>
					</div>
					<div className="message-card" >
						<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

						<div className="info">
							<div className="name-date">
								<div>knabouss</div>
								<div style={{ color: "gray" }}> — Aujourd’hui à 12:44</div>
							</div>
							<div>this is a message from knabouss</div>
						</div>

					</div>
				</div>
				<div className="chat-footer">
					<input />
					<button>&#9658;</button>
				</div>
			</main>
		</div>
	);
}
export default MainCard;
