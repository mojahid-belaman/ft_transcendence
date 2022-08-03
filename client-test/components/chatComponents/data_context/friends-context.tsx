import { createContext, useContext, useEffect, useState } from "react";
import socket from "../../Library/Socket";



/**
 * 
 * I WILL WORK ON THIS ONE LATE
 * 
 */

const FriendsContex = createContext({
    data: [],
    addUser: (user:any) => { },
});

export function FriendsContexProvider(props:any) {

    // const socketContext = useContext(SocketContext)
    const [userData, SetUserData]:any = useState<any[]>([]);

    function addUserHandler(userData:any) {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    
    useEffect(() => {
        socket.emit("allFriends");
        socket.on("getAllFriends", (data: any) => {
            SetUserData(data)
        })
        socket.on("addedNewFriendship", (data: any) => {
            console.log(data);
            // SetUserData([...userData, data])
        })
    }, [])
    
    const context = {
        data: userData,
        addUser: addUserHandler,
    }
    return (
        <FriendsContex.Provider value={context}>
            {props.children}
        </FriendsContex.Provider>
    )
}
export default FriendsContex;