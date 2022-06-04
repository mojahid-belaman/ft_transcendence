import classes from './AllCard.module.css'

function AllCard (){
    return(<div className={classes.allCard}>
        <img alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div>All</div>
        <div className={classes.buttons}>
            <button>Msg</button>
            <button>Unfriend</button>
            <button>Block</button>
        </div>
    </div>)
}
export default AllCard