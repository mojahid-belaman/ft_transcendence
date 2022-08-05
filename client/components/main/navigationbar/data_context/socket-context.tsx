import { createContext, useState } from "react";

import io, { Socket } from 'socket.io-client'
import Cookies from 'js-cookie';

export type SocketContextType = {
    socket: any   
}

const SocketContext = createContext<SocketContextType>({
    socket: Socket
});

export const SocketContexProvider = (props:any) => {
    
    const token = props.token;
    if (token)
    {
        const socket = io("http://localhost:5000", {
            query: {token}
        });
        
        const context = {
            socket: socket
        }
        return (
            <SocketContext.Provider value={context}>
                {props.children}
            </SocketContext.Provider>
        )
    }
    else
        return <></>
}
export default SocketContext;