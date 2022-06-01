import OnlineCard from './OnlineCard'
import classes from './OnlineList.module.css'
function OnlineList() {
    return (<div className={classes.list}>
        <OnlineCard/>
        <OnlineCard/>
        <OnlineCard/>
    </div>)
}
export default OnlineList