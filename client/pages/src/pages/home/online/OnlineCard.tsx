import classes from './OnlineCard.module.css'

function OnlineCard (){
    return(<div className={classes.onlineCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div>Shikma</div>
        <div className={classes.buttons}>
            <button>Msg</button>
            <button>Unfriend</button>
            <button>Block</button>
        </div>
    </div>)
}
export default OnlineCard