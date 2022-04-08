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
				<div className="content-chat">here</div>
				<input />
			</main>
		</div>
	);
}
export default MainCard;
