
import classes from "./Password.module.css"
function Password(props: any) {
    return (
        <div>
            <div className={classes.info} >
                <label> Create password </label>
                <input type="password" name="name" onChange={e => props.setPassword(e.target.value)} className={classes.inputs} required />
            </div>
            <div className={classes.info} >
                <label> Confirm password </label>
                <input type="password" name="name" onChange={e => props.setConfirmedPassword(e.target.value)} className={classes.inputs} required />
            </div>
        </div>
    )
}
export default Password;