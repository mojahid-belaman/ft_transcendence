import {Socket} from 'socket.io'
import {Paddle} from './paddle.interface'

export interface Player {
    socket: Socket;
    score: number;
    paddle: Paddle;
}
