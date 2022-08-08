import axios from 'axios';
import { useEffect, useState } from 'react'
import PeopleCard from './PeopleCard'
import classes from './PeopleList.module.css'
import Cookies from 'js-cookie';

function PeopleList() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
    const token = Cookies.get('access_token');  
      axios.get(`${process.env.BACK_END_URI}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }).then(data => {
          setPeople(data.data);
        });
    }, [])
    
    return (<div className={classes.list}>
        <div>
        {
            people.length !== 0 && people.map((user, index) => {
                return (
                    <PeopleCard key={index} user={user} />
                )
            })
        }
        </div>
    </div>)
}
export default PeopleList