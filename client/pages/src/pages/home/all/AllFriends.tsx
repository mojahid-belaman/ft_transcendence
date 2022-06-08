
import AllCard from './AllCard'
import classes from './AllFriends.module.css'
function AllFriends() {
    return (<div className={classes.list}>
        <AllCard/>
        <AllCard/>
        <AllCard/>
    </div>)
}
export default AllFriends