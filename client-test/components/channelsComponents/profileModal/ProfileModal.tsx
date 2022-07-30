
import NewChannel from '../newChannel/NewChannel';
import ChannelInfo from './ChannelInfo';
import classes from './ProfileModal.module.css'

function ProfileModal(props:any) {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.OpenClose}></div>
      <div className={classes.card}>
        <div onClick={props.OpenClose} className={classes.close}> <i className="fa-solid fa-xmark"></i></div>
        <ChannelInfo/>
      </div>
    </div>)
}
export default ProfileModal;