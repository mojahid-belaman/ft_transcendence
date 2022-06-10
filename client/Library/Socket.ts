import { io } from "socket.io-client";

const socket = io("http://10.13.9.14:5001");

export default socket;
