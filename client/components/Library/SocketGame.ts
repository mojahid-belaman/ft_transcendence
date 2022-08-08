import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { Data } from "./Data";

const data: Data = new Data(1200, 600);

const socket = io(`${process.env.BACK_END_URI}`, {
    query: {
        data
    }
});

export default socket;