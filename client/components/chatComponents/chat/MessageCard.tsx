import { useEffect } from 'react'
import classes from './MessageCard.module.css'
function MessageCard(props: any) {
	useEffect(() => {
	}, []);
	return props.message.user ? (
		<div className={classes.messageCard} >
			<img src={props.message.user.avatar}></img>

			<div className={classes.info}>
				<div className={classes.nameDate}>
					<div>{props.message.user.username}</div>
					<div > {props.message.date}</div>
				</div>
				{/* pay attention to the max width of the message */}
				<div className={classes.msgContent} >{props.message.CurentMessage}</div>
			</div>

		</div>
	) : <></>
}
export default MessageCard