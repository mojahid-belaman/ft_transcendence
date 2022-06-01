import classes from './Members.module.css'

function MemberCard(){
    return(<div className={classes.MembersCard}>
        <img className={classes.MemberImage} alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div>Member</div>
    </div>)
}

function Members() {
    return (
        <div>
            <hr />
            <div className={classes.Members}>
                <div ><MemberCard/></div>
                <div ><MemberCard/></div>
            </div>
        </div>)
}
export default Members;