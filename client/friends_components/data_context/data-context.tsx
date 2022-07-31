import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const DataContex = createContext({
    data: [],
    selectedConversation: {},
    addUser: (user:any) => { },
    setConversation: (val:any) => { }
});

export const DataContexProvider = (props:any) => {

    const [userData, SetUserData]:any = useState([]);
    const [selectedConv,setSelectedConv] = useState({})

    const getAllConversations = async (token: any) => {
        return await axios.get(`http://localhost:5000/conversations/messages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(data => {
              SetUserData(data.data);
              if (data.data.length !== 0)
                setSelectedConv(data.data[0])
        });
    } 

    const addUserHandler = (userData:any) => {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    // const setConversation = (convId:any) => {
    //     console.log(userData.find((user:any) => user.conversationId === convId));
    //     setSelectedConv(userData.find((user:any) => user.conversationId === convId));
    //     setSelectedConv(userData[convId]);
    // }

    const setConversation = (convId:any) => {
        setSelectedConv(userData.find((user:any) => user.conversationId === convId));
    } 

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token)
            getAllConversations(token);
    }, [])
    
/* 
    const context = {
        data: userData,
        addUser: addUserHandler,
        selectedConversation: selectedConv,
        setConversation: setConversation
    } */
    return (userData && userData.length !== 0) && (
         <DataContex.Provider value={{
            data: userData,
            addUser: addUserHandler,
            selectedConversation: selectedConv,
            setConversation: setConversation
        }}>
            {props.children}
        </DataContex.Provider>
    )
}
export default DataContex;