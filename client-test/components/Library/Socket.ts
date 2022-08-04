import { io } from "socket.io-client";
<<<<<<< HEAD
import { Data } from "./Data";

const dataGame: Data = new Data(1200, 600);
const socket = io("http://localhost:5000", {
    query: {
        // token: token ? token : undefined,
            data: dataGame ? dataGame : undefined
    }
=======
import Cookies from 'js-cookie';
import { Data } from "./Data";

// const token = Cookies.get("access_token")

const dataGame: Data = new Data(1200, 600);

const socket = io("http://localhost:5001", {
    query: {/* token: token ? token : undefined, */
            data: dataGame ? dataGame : undefined}
>>>>>>> 719069b717041618375418c418061980cf1df58f
});

export default socket;
