import "./SideBar.css"

function SideBar(props) {
	function Setter(event){
		console.log(event.target.value);
		props.channelSetter(event.target.value);
	}
	return (
		<div className="sidebar">
			<div>
				<img src="https://i.pinimg.com/736x/70/09/1c/70091c4cd9d4cdfb79ecdcf198205c20.jpg"></img>
			</div>
			<div className="content-bar">
				<h3>Channels</h3>
			</div>
			<button onClick={Setter}><div className="inner-html">#General</div></button>
			<button onClick={Setter}><div className="inner-html">#Announcements</div></button>
			<button onClick={Setter}><div className="inner-html">#Music</div></button>
			<button onClick={Setter}><div className="inner-html">#Random</div></button>
		</div>
	)
}
export default SideBar;