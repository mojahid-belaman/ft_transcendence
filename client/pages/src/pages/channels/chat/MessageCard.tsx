import classes from './MessageCard.module.css'
function MessageCard(props: any) {
	return (
		<div className={classes.messageCard} >
			<img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>

<<<<<<< HEAD:client/pages/src/pages/channels/chat/MessageCard.tsx
						<div className={classes.info}>
							<div className={classes.nameDate}>
								<div>Soukaina</div>
								<div > — Aujourd’hui à 12:44</div>
							</div>
							{/* pay attention to the max width of the message */}
							<div className={classes.msgContent} >{props.message}</div>
						</div>
=======
			<div className={classes.info}>
				<div className={classes.nameDate}>
					<div>Soukaina</div>
					<div > — Aujourd’hui à 12:44</div>
				</div>
				{/* pay attention to the max width of the message */}
				<div className={classes.msgContent} >{props.message}</div>
			</div>
>>>>>>> 7574aebd622b15cfab4021182a4a791bcfe08c5d:pages/src/pages/friends/chat/MessageCard.tsx

		</div>
	)
}
export default MessageCard