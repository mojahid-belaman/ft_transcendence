import PeopleCard from './PeopleCard'
import classes from './PeopleList.module.css'
function PeopleList() {
    return (<div className={classes.list}>
        <div>
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
        </div>
    </div>)
}
export default PeopleList