import { io } from "socket.io-client";

const socket = io("http://10.13.5.10:5001");

export default socket;
