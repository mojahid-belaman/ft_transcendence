import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { connectionStatus } from './ChannelInfo';
import classes from './Members.module.css'

function MemberCard(props: any) {
    const [error, setError] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [mute, setMute] = useState(false);
    const dateRef: any = useRef()

    const getConnection = async () => {
        const token = Cookies.get("access_token");
        //console.log("CHANNEL => ", props);

        return await axios.get(`${process.env.BACKEND_URL}/channels/connections/${props.channelId}/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                //console.log(res);
                if (res.status === 200)
                    setUserStatus(res.data.status)
            })
    }

    const removeHandler = async () => {
        const token = Cookies.get("access_token");
        await axios.delete(`${process.env.BACKEND_URL}/channels/connections/${props.channelId}/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status == 200)
                    props.setUsers(props.users.filter((user: any) => user.userId !== props.userId))
            })
            .catch((err) => setError(err.response.data.message))
    }

    const powerUp = async () => {
        const token = Cookies.get("access_token");
        const data = { status: connectionStatus.ADMIN }
        await axios.put(`${process.env.BACKEND_URL}/channels/connections/members/${props.channelId}/${props.userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200)
                    setUserStatus(connectionStatus.ADMIN);
            })
            .catch((err) => setError(err.response.data.message))
    }

    useEffect(() => {
        getConnection();
    }, [])

    const muteHandler = async () => {
        const token = Cookies.get("access_token");        
        const data = {
            date: dateRef.current.value
        };
        await axios.post(`${process.env.BACKEND_URL}/channels/connections/mute/${props.channelId}/${props.userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => { })
            .catch(error => setError(error.response.data.message))
    }

    return (<div className={classes.MembersCard}>
        <img className={classes.MemberImage} alt="" src={props.avatar}></img>
        <div>{props.username}</div>
        <div>{`(Status: ${userStatus})`}</div>
        <div className={classes.buttons}>
            {(props.status === connectionStatus.ADMIN || props.status === connectionStatus.OWNER) ?
                (<>
                    <button className={classes.button} onClick={() => setMute(!mute)}>Mute</button>
                    {mute ? (
                        <>
                            <input name="muteDate" type="datetime-local"  ref={dateRef}/>
                            <button className={classes.button} onClick={muteHandler}>Validate</button>
                        </>
                    ) : <></>}
                    <button className={classes.button} onClick={removeHandler} >Remove</button>
                    <button className={classes.button} onClick={powerUp} >Power UP</button>
                </>) : <></>
            }
        </div>
        <div>{error}</div>
    </div>)
}

function Members(props: any) {
    const [users, setUsers] = useState<any[]>([]);
    const getMembers = async () => {
        const token = Cookies.get("access_token");
        return await axios.get(`${process.env.BACKEND_URL}/channels/connections/members/${props.channel.channelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            //console.log(res);
            setUsers(res.data)
        }).catch(() => { })
    }
    useEffect(() => {
        getMembers()
    }, [])

    return users.length !== 0 ? (
        <div>
            <hr />
            <div className={classes.Members}>
                {users.map((user, index) => (
                    <div ><MemberCard key={index} {...user} channelId={props.channel.channelId} status={props.status} setUsers={setUsers} users={users} /></div>
                ))}
            </div>
        </div>) : <></>
}
export default Members;