import classes from './MessageCard.module.css'
function MessageCard(props:any){
	return(
		<div className={classes.messageCard} >
						<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

						<div className={classes.info}>
							<div className={classes.nameDate}>
								<div>knabouss</div>
								<div style={{ color: "gray" }}> — Aujourd’hui à 12:44</div>
							</div>
							{/* pay attention to the max width of the message */}
							<div >{props.message}</div>
						</div>

					</div>
	)
}
export default MessageCard