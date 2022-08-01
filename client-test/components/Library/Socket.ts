import { io } from "socket.io-client";
import Cookies from 'js-cookie';

const token = Cookies.get("access_token")

const socket = io("http://localhost:5000", {
    query: {token: token ? token : ""}
});

export default socket;
