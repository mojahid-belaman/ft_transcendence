import { io } from "socket.io-client";

const socket = io("http://10.13.2.4:5001");

export default socket;
