import { io } from "socket.io-client";

const socket = io("http://10.12.8.14:5001");

export default socket;