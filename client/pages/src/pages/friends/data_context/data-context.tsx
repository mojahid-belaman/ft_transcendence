import { createContext, useState } from "react";

const DataContex = createContext({
    data: [],
    selectedConversation: {},
    addUser: (user:any) => { },
    setConversation: (val:any) => { }
});

export function DataContexProvider(props:any) {
    const [userData, SetUserData]:any = useState([{ conversationId: 0, userId: 1, name: "aboulbaz" },
    { conversationId: 1, userId: 5, name: "soukaina" },
    { conversationId: 2, userId: 9, name: "salma" }
    ]);
    const [selectedConv,setSelectedConv] = useState(userData[0])
    function addUserHandler(userData:any) {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    function setConversation(convId:any) {
        console.log(userData.find((user:any) => user.conversationId === convId));
        setSelectedConv(userData.find((user:any) => user.conversationId === convId));
    }
    const context = {
        data: userData,
        addUser: addUserHandler,
        selectedConversation: selectedConv,
        setConversation: setConversation
    }
    return (
        <DataContex.Provider value={context}>
            {props.children}
        </DataContex.Provider>
    )
}
export default DataContex;