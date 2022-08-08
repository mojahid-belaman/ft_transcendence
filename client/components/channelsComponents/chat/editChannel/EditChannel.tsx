import classes from './EditChannel.module.css'
import Password from './Password';
import { useContext, useEffect, useRef, useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'
import DataChannel from '../../data_context/data-context';

function EditChannel(props: any) {
    const [choice, setChoice] = useState(false)
    const [status, setStatus] = useState('Public');
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const CHANNEL_STATUS = ["Public", "Private", "Protected"];
    const nameInputRef: any = useRef();
    const descriptionInputRef: any = useRef();
    const statusInputRef: any = useRef();

    const changeStatusHandler = (stat: string) => {
        setChoice(stat === "Protected");
        setStatus(stat)
    }

    const dataChannelVar = useContext(DataChannel);

    const SubmitHandler = async (event: any) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const data = {
            channelId: props.channelId,
            name: enteredName,
            description: enteredDescription,
            status: status,
            password: password
        }
        if (password === confirmedPassword) {
            const token = Cookies.get("access_token");
            //console.log("data to update => ", data);
            
            await axios.post(`${process.env.BACKEND_URL}/channels/update`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(async (data) => {
                await dataChannelVar.getChannels();
                props.OpenClose()
            })
                .catch(err => console.log(err))
        }

    }

    const getChannel = async () => {
        const token = Cookies.get("access_token");
        await axios.get(`${process.env.BACKEND_URL}/channels/${props.channelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setName(res.data.name)
            setDescription(res.data.description)
        });
    }

    useEffect(() => {
        //console.log(props);
        getChannel()
    }, [])

    return (
        <div>
            <div onClick={props.OpenClose} className={classes.backdrop}></div>
            <div className={classes.card}>
                <form className={classes.editForm} onSubmit={SubmitHandler} >
                    <div className={classes.text}>Edit channel</div>
                    <div className={classes.info}>
                        <label> Channel name </label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className={classes.inputs} required ref={nameInputRef} />
                    </div>
                    <div className={classes.info}>
                        <label> Description <span>(optional)</span> </label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} required ref={descriptionInputRef} />
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
                    {choice ? <Password setPassword={setPassword} setConfirmedPassword={setConfirmedPassword} /> : null}
                    <div></div>
                    <div className={classes.buttons}>
                        <button onClick={props.OpenClose} id={classes.cancel}>Cancel</button>
                        <button id={classes.edit}>Save</button>
                    </div>
                </form>
            </div>
        </div>)
}


export default EditChannel;   