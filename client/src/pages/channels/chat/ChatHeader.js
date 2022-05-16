import classes from './ChatHeader.module.css'

function ChatHeader(props){
    return<button className={classes.chatHeader} onClick={props.toggle} >
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div className={classes.info}>
        <div>{props.channel.name}</div>
        </div>
    </button>
}
export default ChatHeader