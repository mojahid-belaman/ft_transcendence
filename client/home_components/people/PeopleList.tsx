import axios from 'axios';
import { useEffect, useState } from 'react'
import PeopleCard from './PeopleCard'
import classes from './PeopleList.module.css'
import Cookies from 'js-cookie';

function PeopleList() {
    const [people, setPeople] = useState([]);

    const getAllPeople = async (token: any) => {
        return await axios.get(`http://localhost:5000/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
          }).then(data => {
              console.log(data.data);
              setPeople(data.data);
            });
    } 

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token)
            getAllPeople(token);
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