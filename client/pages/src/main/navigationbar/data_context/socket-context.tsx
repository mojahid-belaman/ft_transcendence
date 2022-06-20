import { createContext, useState } from "react";

import { io } from "socket.io-client";




const SocketContext = createContext({
    data: [],
});

export function SocketContexProvider(props:any) {

    const socket = io("ws://example.com/my-namespace", {
        reconnectionDelayMax: 10000,
        auth: {
            token: "123"
        },
        query: {
            "my-key": "my-value"
        }
    });
    const context = {
        data: [],
    }
    return (
        <SocketContext.Provider value={context}>
            {props.children}
        </SocketContext.Provider>
    )
}
export default SocketContexProvider;