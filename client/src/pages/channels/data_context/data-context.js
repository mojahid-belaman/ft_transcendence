import { createContext, useState } from "react";

const DataChannel = createContext({
    data: [],
    selectedConversation: {},
    addChannel: (user) => { },
    setConversation: (val) => { }
});

export function DataChannelProvider(props) {
    const [userData, SetUserData] = useState([{ conversationId: 0, channelId: 1, name: "annoucement" },
    { conversationId: 1, channelId: 5, name: "general" },
    { conversationId: 2, channelId: 9, name: "random" }
    ]);
    const [selectedConv,setSelectedConv] = useState(userData[0])
    function addChannelHandler(userData) {
        SetUserData((previousData) => {
            return (previousData.concat(userData));
        })
    }
    function setConversation(convId) {
        setSelectedConv(userData.find(user => user.conversationId === convId));
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