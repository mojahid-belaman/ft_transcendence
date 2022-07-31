import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

import io, { Socket } from 'socket.io-client'

export type SocketContextType = {
    socket: any
}

const SocketContext = createContext<SocketContextType>({
    socket: Socket
});

export const SocketContexProvider = (props: any) => {

    const [socket, setSocket] = useState<Socket>();
    const [token, setToken] = useState<string>();
    const history = useRouter();

    useEffect(() => {
        const tmp = Cookies.get('access_tmp');
        console.log(tmp);
        console.log("HERE 1");
        if (tmp) {
            axios.get(`http://localhost:5000/auth/isAuthorized`, {
                headers: {
                    Authorization: `Bearer ${tmp}`,
                }
            }).then(() => {
                setSocket(io("http://localhost:5000", {
                    query: { tmp }
                }))
                console.log("HERE 2");
                setToken(tmp);
            })
                .catch(() => {
                    // history.push('/auth')
                    console.log("HERE 3");
                });
        }
        else {
            console.log("HERE 4");
            // history.replace('/auth')
        }
    }, []);
    if (token) {
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