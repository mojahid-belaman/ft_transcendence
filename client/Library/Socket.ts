import { io } from "socket.io-client";
import { Data } from "./Data";

const dataGame: Data = new Data(1200, 600);

const socket = io("http://localhost:5001", {
    query: {
        data: dataGame ? dataGame : undefined
    }
});


export default socket;
