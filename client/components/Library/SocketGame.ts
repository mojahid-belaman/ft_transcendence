import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { Data } from "./Data";

const data: Data = new Data(1200, 600);

const socket = io(`${process.env.BACKEND_URL}`, {
    query: {
        data
    }
});

export default socket;