import { createContext, useState } from "react";

import io from 'socket.io-client'
import Cookies from 'js-cookie';


// const token = Cookies.get('access_token');
// const socketOptions = {
//     transportOptions: {
//       polling: {
//         extraHeaders: {
//           Authorization: 'token', //'Bearer h93t4293t49jt34j9rferek...'
//         }
//       }
//     }
//  };
 
const socket = io.connect("http://localhost:5000");
const SocketContext = createContext({
    socket: socket
});
export const SocketContexProvider = (props:any) => {

    const context = {
        socket: socket
    }
    return (
        <SocketContext.Provider value={context}>
            {props.children}
        </SocketContext.Provider>
    )
}
export default SocketContext;