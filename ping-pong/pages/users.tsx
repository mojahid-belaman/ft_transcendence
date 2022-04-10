import React from 'react'
import User from '../components/User'

function UserList({users}:any) {
  return (
    <>
        <h1>List of users</h1>
        {
            users.map((user:any) => {
                return (
                    <User key={user.id} user = {user} />
                )
            })
        }
    </>
  )
}

export default UserList

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    const data = await response.json();

    return {
        props: {
            users: data,
        },
    }
}