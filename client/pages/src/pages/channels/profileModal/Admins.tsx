import classes from './Admins.module.css'

function AdminCard() {
    return (<div className={classes.AdminsCard}>
        <img className={classes.AdminImage} alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div>Admin</div>
        {/* if user is owner */}
        <div className={classes.buttons}>
            <button className={classes.button}>remove</button>
        </div>
    </div>)
}

function Admins() {
    return (
        <div>
            <hr />
            <div className={classes.Admins}>
                <div ><AdminCard /></div>
                <div ><AdminCard /></div>
                <div ><AdminCard /></div>
            </div>
        </div>)
}
export default Admins;