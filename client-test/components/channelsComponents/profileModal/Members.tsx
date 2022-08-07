import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { connectionStatus } from './ChannelInfo';
import classes from './Members.module.css'

function MemberCard(props: any) {
    return (<div className={classes.MembersCard}>
        <img className={classes.MemberImage} alt="" src={props.avatar}></img>
        <div>{props.username}</div>
        <div className={classes.buttons}>
            {(props.status === connectionStatus.ADMIN || props.status === connectionStatus.OWNER) ?
                (
                    <>
                        <button className={classes.button}>Mute</button>
                        <button className={classes.button}>Ban</button>
                        <button className={classes.button}>Power UP</button>
                    </>) : <></>
            }
        </div>
    </div>)
}

function Members(props: any) {
    const [users, setUsers] = useState<any[]>([]);
    const getMembers = async () => {
        const token = Cookies.get("access_token");
        return await axios.get(`http://localhost:5000/channels/connections/members/${props.channel.channelId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            setUsers(res.data)
        }).catch(() => {})
    }
    useEffect(() => {
        getMembers()
    }, [])
    return users.length !== 0 ? (
        <div>
            <hr />
            <div className={classes.Members}>
                {users.map((user, index) => (
                <div ><MemberCard key={index} {...user} status={props.status} /></div>
                ))}
            </div>
        </div>) : <></>
}
export default Members;