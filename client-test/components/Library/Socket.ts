import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { Data } from "./Data";

// const token = Cookies.get("access_token")

const dataGame: Data = new Data(1200, 600);

const socket = io("http://localhost:5001", {
    query: {/* token: token ? token : undefined, */
            data: dataGame ? dataGame : undefined}
});

export default socket;
