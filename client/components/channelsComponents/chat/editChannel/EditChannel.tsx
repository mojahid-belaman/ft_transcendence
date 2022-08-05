import classes from './EditChannel.module.css'
import Password from './Password';
import { useRef, useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'

function EditChannel(props:any) {
    const [choice, setChoice] = useState(false)
    const [status, setStatus] = useState('Public');
    const CHANNEL_STATUS = ["Public", "Private", "Protected"];
    const nameInputRef:any = useRef();
    const descriptionInputRef :any= useRef();
    const statusInputRef :any= useRef();

    const changeStatusHandler = (stat: string) => {
        setChoice(stat === "Protected");
        setStatus(stat)
    }

    const SubmitHandler = async (event:any) => {
        event.preventDefault();
        const enteredName =nameInputRef.current.value;
        const enteredDescription =descriptionInputRef.current.value;

        const data={
            name: enteredName,
            descrition: enteredDescription,
            status: status
        }
        // console.log(status);
    //     const token = Cookies.get('access_token');        
    //     await axios.post(`${process.env.API}/channels`, data, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     }).then(data => console.log(data))
    //     .catch(err => console.log(err))
    }
    return (
        <div>
            <div onClick={props.OpenClose} className={classes.backdrop}></div>
            <div className={classes.card}>
                <form className={classes.editForm} onSubmit={SubmitHandler} >
                    <div className={classes.text}>Edit channel</div>
                    <div className={classes.info}>
                        <label> Channel name </label>
                        <input type="text" name="name" className={classes.inputs} required ref={nameInputRef} />
                    </div>
                    <div className={classes.info}>
                        <label> Description <span>(optional)</span> </label>
                        <textarea name="description" required ref={descriptionInputRef} />
                    </div>
                    <div className={classes.info}>
                        <label > Status </label>
                        <div ref={statusInputRef} >
                            {CHANNEL_STATUS.map(stats => (
                                <div key={stats} className={classes.status}><input type="radio" name="status" onChange={() => changeStatusHandler(stats)} />
                                    <label>{stats}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {choice ? <Password /> : null}
                    <div className={classes.buttons}>
                        <button onClick={props.OpenClose} id={classes.cancel}>Cancel</button>
                        <button id={classes.edit}>Save</button>
                    </div>
                </form>
            </div>
        </div>)
}
export default EditChannel;   