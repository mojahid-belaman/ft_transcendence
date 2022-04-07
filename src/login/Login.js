import './Login.css'

function Login(props){
    return(
        <div className="joinAccountContainer">
          <h3>Log In</h3>
          <input type="text" placeholder="Username..." onChange={(event) => {
            props.setterUsername(event.target.value);
          }} />
          <input type="text" placeholder="Room ID..." onChange={(event) => {
            props.setterRoom(event.target.value);
          }} />
          <button >Join A Room</button>
        </div> 
    )
}
export default Login;