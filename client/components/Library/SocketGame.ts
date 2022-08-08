import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { Data } from "./Data";

const data: Data = new Data(1200, 600);

const socket = io("http://localhost:5000/game", {
    query: {
        data
    }
});

export default socket;