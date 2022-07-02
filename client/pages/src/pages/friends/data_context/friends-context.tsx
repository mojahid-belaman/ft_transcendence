import { createContext, useContext, useEffect, useState } from "react";
import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import Cookies from 'js-cookie';



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

    const socketContext = useContext(SocketContext)
    const [userData, SetUserData]:any = useState<any[]>([]);

    function addUserHandler(userData:any) {
        SetUserData((previousData:any) => {
            return (previousData.concat(userData));
        })
    }
    
    useEffect(() => {
        socketContext.socket.emit("allFriends");
        socketContext.socket.addEventListener("getAllFriends", (data: any) => {
            SetUserData(data)
        })
        socketContext.socket.addEventListener("addedNewFriendship", (data: any) => {
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