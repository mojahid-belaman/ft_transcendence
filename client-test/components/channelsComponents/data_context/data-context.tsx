import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

const DataChannel = createContext({
    data: [],
    selectedConversation: {},
    addChannel: (user:any) => { },
    setConversation: (val:any) => { }
});

export function DataChannelProvider(props:any) {
    const [userData, SetUserData]:any = useState([]);
    const [selectedConv,setSelectedConv] = useState(userData.length !== 0 ? userData[0] : undefined )
    function addChannelHandler(userData:any) {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    function setConversation(convId:any) {
        setSelectedConv(userData.find((user:any) => user.conversationId === convId));
    }

    const getChannels = async () => {
        const token = Cookies.get("access_token");
        await axios.get('http://localhost:5000/channels', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => SetUserData([...res.data]));
    }

    useEffect(() => {
        getChannels();
    }, []);

    return (
        <DataChannel.Provider value={{
            data: userData,
            addChannel: addChannelHandler,
            selectedConversation: selectedConv,
            setConversation: setConversation
        }}>
            {props.children}
        </DataChannel.Provider>
    )
}
export default DataChannel;