import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import classes from './People.module.css'

function PeopleCard(props: any) {

    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");

    const AddToChannel = async () => {
        const token = Cookies.get("access_token")
        const data = {channelId: props.channelId}
        await axios.post(`${process.env.BACKEND_URL}/channels/connections/new/${props.id}`, data,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(() => {
            setAdded(!added)
        })
        .catch((err) => setError(err.response.data.message))
    }

    useEffect(() => {
    }, [])

    return (<div className={classes.PeopleCard}>
        <img className={classes.AdminImage} alt="" src={props.avatar}></img>
        <div>{props.username}</div>
        {/* if user is owner */}
        <div className={classes.buttons}>
        {
           !added ? 
           (<button className={classes.button} onClick={AddToChannel}>add to channel</button>)
           : <></>
        }
        {error !== "" ? (<span>{error}</span>) : <></>}
        </div>
    </div>)
}

function People(props: any) {

    const [users, setUsers] = useState<any[]>([]);


    const token = Cookies.get("access_token");
    const getAllUsers = async () => {
        await axios.get(`${process.env.BACKEND_URL}/users/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUsers([...res.data]);
            })
    }

    useEffect(() => {
        getAllUsers()
    }, []);

    return users.length !== 0 ? (
        <div>
            <hr />
            <div className={classes.People}>
                {users.map((user, index) => (<div key={index} ><PeopleCard {...user} channelId={props.channel.channelId} /></div>))}
            </div>
        </div>) : <></>
}
export default People;