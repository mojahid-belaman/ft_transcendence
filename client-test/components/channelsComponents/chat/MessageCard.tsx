import classes from './MessageCard.module.css'
function MessageCard(props: any) {
	return (
		<div className={classes.messageCard} >
			<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

			<div className={classes.info}>
				<div className={classes.nameDate}>
					<div>{props.message.user.username}</div>
					<div > {props.message.date}</div>
				</div>
				{/* pay attention to the max width of the message */}
				<div className={classes.msgContent} >{props.message.CurentMessage}</div>
			</div>

		</div>
	)
}
export default MessageCard