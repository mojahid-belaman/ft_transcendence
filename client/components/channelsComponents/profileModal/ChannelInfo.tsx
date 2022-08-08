import axios from 'axios';
import { Channel } from 'diagnostics_channel';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { channelStatus } from '../Channels';
import About from './About';
import Admins from './Admins';
import classes from './ChannelInfo.module.css'
import Members from './Members';
import People from './People';

export enum connectionStatus {
    MEMBER = "member",
    ADMIN = "admin",
    BLOCKED = "blocked",
    OWNER = "owner"
}

function ChannelInfo(props: any) {
    const [buttons, setButton] = useState(1);
    const [status, setStatus] = useState(connectionStatus.MEMBER)

    const setUserStatus = async () => {
        const token = Cookies.get("access_token");
        await axios.get(`${process.env.BACKEND_URL}/channels/connections/checkSatus/${props.channel.channelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            //console.log("data in debug mode => ", res.data);

            setStatus(res.data)
        })
            .catch(() => setStatus(connectionStatus.MEMBER))
    }

    useEffect(() => {
        setUserStatus()
    }, [])

    return (
        <div className={classes.infoCard}>
            <div className={classes.header}>
                <img className={classes.channelImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                <div className={classes.channelName}>
                    <p>{props.channel.name}</p>
                    <div className={classes.buttons}>
                        <button onClick={() => setButton(1)}>About</button>
                        <button onClick={() => setButton(2)}>Admins</button>
                        <button onClick={() => setButton(3)}>Members</button>
                        {
                            (status === connectionStatus.ADMIN || status === connectionStatus.OWNER)
                                ? <button onClick={() => setButton(4)}>People</button> : <></>
                        }
                    </div>
                </div>
            </div>
            {buttons === 1 ? <About channel={props.channel} /> : null}
            {buttons === 2 ? <div><Admins status={status} channel={props.channel} /></div> : null}
            {buttons === 3 ? <div><Members status={status} channel={props.channel} /></div> : null}
            {buttons === 4 ? <div><People status={status} channel={props.channel} /></div> : null}
        </div>
    )
}
export default ChannelInfo
