import classes from './NewChannel.module.css'
import Password from './Password';
import { useRef, useState } from "react"
import Cookies from 'js-cookie';
import axios from 'axios';

function NewChannel(props:any) {
    const STATUS = ['Public', 'Private', 'Protected'];
    const [status, setStatus] = useState('Public')
    const nameInputRef:any = useRef();
    const descriptionInputRef :any= useRef();
    const statusInputRef :any= useRef();
    const SubmitHandler = async (event:any) => {
        event.preventDefault();
        const enteredName =nameInputRef.current.value;
        const enteredDescription =descriptionInputRef.current.value;
        const data={
            name: enteredName,
            status:status,
            description: enteredDescription
        }

        const token = Cookies.get('access_token')
        console.log(data);
        await axios.post(`http://localhost:5000/channels`,
        data, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
        
        });
    }
    return (
        <div>
            <div onClick={props.OpenClose} className={classes.backdrop}></div>
            <div className={classes.card}>
                <form className={classes.createForm} onSubmit={SubmitHandler} >
                    <div className={classes.text}>Create new channel</div>
                    <h5>Channels are where your team communicate, They're best when to organized around topic </h5>
                    <div className={classes.info}>
                        <label> Channel name </label>
                        <input type="text" name="name" className={classes.inputs} required ref={nameInputRef} />
                    </div>
                    <div className={classes.info}>
                        <label> Description <span>(optional)</span> </label>
                        <textarea /* type="text" */ name="description" required ref={descriptionInputRef} />
                    </div>
                    <div className={classes.info}>
                        <label > Status </label>
                        <div ref={statusInputRef} >
                            {
                                STATUS.map((stat, index) => {
                                    return (
                                    <div key={index} className={classes.status}><input type="radio" name="status" onClick={() => setStatus(stat)} />
                                        {stat}
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {status === 'protected' ? <Password /> : null}
                    <div className={classes.info}>
                        <label> Add people <span>(You can skip this step for now) </span></label>
                        <input type="text" name="name" className={classes.inputs} />

                    </div>
                    <div className={classes.buttons}>
                        <button onClick={props.OpenClose} id={classes.cancel}>Cancel</button>
                        <button id={classes.create}>Create</button>
                    </div>
                </form>
            </div>
        </div>)
}
export default NewChannel;