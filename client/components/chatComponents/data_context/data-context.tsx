import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import socket from "../../Library/Socket";

const DataContex = createContext({
    data: [],
    selectedConversation: {},
    addUser: (user: any) => {},
    setConversation: (val: any) => {},
    getConversationByLogin: (val: any) => {}
});

export function DataContexProvider(props: any) {
    const [userData, SetUserData]: any = useState([]);
    const [selectedConv, setSelectedConv] = useState(userData.length !== 0 ? userData[0] : undefined )
    function addUserHandler(userData: any) {
        SetUserData((previousData: any) => {
            return (previousData.concat(userData));
        })
    }
    function setConversation(convId: any) {
        setSelectedConv(userData.find((user: any) => user.conversationId === convId));
    }

    const getConversationByLogin = (login: string) => setSelectedConv(userData.find((user: any) => user.login === login))

    socket.on("newConversation", (data) => SetUserData([...userData, data]))

    const getConversations = async () => {
        const token = Cookies.get("access_token");
        await axios.get(`${process.env.BACK_END_URI}/conversations/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => SetUserData([...res.data]));
    }

    useEffect(() => {
        getConversations();
    }, []);

    return userData.length !== 0 ? (
        <DataContex.Provider value={{
            data: userData,
            addUser: addUserHandler,
            selectedConversation: selectedConv,
            setConversation,
            getConversationByLogin
        }
        }>
            {props.children}
        </DataContex.Provider>
    ) : <>{props.children}</>
}
export default DataContex;