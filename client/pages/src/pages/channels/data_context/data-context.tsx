import { createContext, useState } from "react";

const DataChannel = createContext({
    data: [],
    selectedConversation: {},
    addChannel: (user:any) => { },
    setConversation: (val:any) => { }
});

export function DataChannelProvider(props:any) {
    const [userData, SetUserData]:any = useState([{ conversationId: 0, channelId: 1, name: "annoucement" ,status:"private"},
    { conversationId: 1, channelId: 5, name: "general" ,status:"public"},
    { conversationId: 2, channelId: 9, name: "random" ,status:"protected"}
    ]);
    const [selectedConv,setSelectedConv] = useState(userData[0])
    function addChannelHandler(userData:any) {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    function setConversation(convId:any) {
        setSelectedConv(userData.find((user:any) => user.conversationId === convId));
    }
    const context = {
        data: userData,
        addChannel: addChannelHandler,
        selectedConversation: selectedConv,
        setConversation: setConversation
    }
    return (
        <DataChannel.Provider value={context}>
            {props.children}
        </DataChannel.Provider>
    )
}
export default DataChannel;