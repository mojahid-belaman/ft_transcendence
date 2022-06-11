import { io } from "socket.io-client";

const socket = io("http://10.13.10.8:5001");

export default socket;
