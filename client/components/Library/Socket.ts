import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { Data } from "./Data";

const token = Cookies.get("access_token")
const data: Data = new Data(1200, 600);

let socket = io("http://localhost:5000", {
    query: {
        token,
        data
    }
});

export default socket;
