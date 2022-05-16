
import classes from './ProfileModal.module.css'

function ProfileModal(props) {
    return <div>
        <div className={classes.backdrop}></div>
        <div className={classes.card}>
          <div onClick={props.OpenClose} className={classes.close}> <i className="fa-solid fa-xmark"></i></div>
        </div>
    </div>
}
export default ProfileModal;