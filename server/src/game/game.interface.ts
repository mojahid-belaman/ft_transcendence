import {Player} from './player.interface'
import {Ball} from './ball.interface'
export interface Game {
    id: string;
    player_One: Player;
    player_Two: Player;
    ball: Ball;
}
