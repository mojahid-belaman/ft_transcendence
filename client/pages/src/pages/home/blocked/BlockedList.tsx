import axios from 'axios';
import { useEffect, useState } from 'react'
import BlockedCard from './BlockedCard'
import classes from './BlockedList.module.css'
import Cookies from 'js-cookie';

function BlockedList() {
    const [Blocked, setBlocked] = useState([]);

    useEffect(() => {
    const token = Cookies.get('access_token');  
      axios.get(`http://localhost:5000/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }).then(data => {
          console.log(data.data);
          setBlocked(data.data);
        });
    }, [])
    
    return (<div className={classes.list}>
        <div>
            <BlockedCard/>
            <BlockedCard/>
        {/* {
            Blocked.length !== 0 && Blocked.map((user, index) => {
                return (
                    <BlockedCard key={index} {...user} />
                )
            })
        } */}
        </div>
    </div>)
}
export default BlockedList