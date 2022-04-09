import "./SideBar.css"
import { Link } from "react-router-dom"
function SideBar(props) {
	function Setter(event) {
		props.channelSetter(event.target.textContent);
	}
	return (
		<div className="sidebar">
			<div>
				<img src="https://i.pinimg.com/736x/70/09/1c/70091c4cd9d4cdfb79ecdcf198205c20.jpg"></img>
			</div>
			<div className="content-bar">
				<h3>Channels</h3>
			</div>
			<Link className="link" to={'/'} ><button onClick={Setter}>Home</button></Link>
			{props.data.map((data) => (
				<Link className="link" to={'/' + data} ><button onClick={Setter}>{data}</button></Link>
			))}
		</div>
	)
}
export default SideBar;