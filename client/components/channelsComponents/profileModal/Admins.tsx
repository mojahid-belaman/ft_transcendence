import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import classes from './Admins.module.css'
import { connectionStatus } from './ChannelInfo';

function AdminCard(props: any) {

    useEffect(() => {
        //console.log("debugging props => ", props);
    })

    return (<div className={classes.AdminsCard}>
        <img className={classes.AdminImage} alt="" src={props.avatar}></img>

        <div>{props.username}</div>
        {/* if user is owner */}
        <div className={classes.buttons}>
            {(props.status === connectionStatus.OWNER) ? (<button className={classes.button}>remove</button>) : <></>}
        </div>
    </div>)
}

function Admins(props: any) {
    const [users, setUsers] = useState<any[]>([]);
    const getMembers = async () => {
        const token = Cookies.get("access_token");
        return await axios.get(`http://localhost:5000/channels/connections/members/${props.channel.channelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setUsers(res.data.filter((user: any) => (user.status === connectionStatus.OWNER || user.status === connectionStatus.ADMIN)))
        }).catch(() => { })
    }
    useEffect(() => {
        getMembers()
    }, [])
    return (
        <div>
            <hr />
            <div className={classes.Admins}>
                {
                    users
                        .map((user, index) => <div key= {index}><AdminCard {...user} status={props.status} /></div>)
                }
            </div>
        </div>)
}
export default Admins;