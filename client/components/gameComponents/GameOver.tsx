import  ParticleWinner  from "./ParticleWinner";
import style from '../gameComponents/gameStyle/GameOver.module.css'
import { Data, StateGame } from "../Library/Data";
import ParticleBackground from "./ParticleBackground";

export function GameOver({data, setIsGame, setCurrentState}: any) {
    const myVar: JSX.Element = (data.get_Winner() ? 
                <div className={style.loser}>
                    <h2>You Lose</h2>
                    <button onClick={() => {setIsGame(false); setCurrentState(StateGame.WAIT); data.set_State(StateGame.WAIT); }}>RETRY</button>
                </div> : 
                <div className={style.win}>
                    <h2>You Win</h2>
                    <button onClick={() => {setIsGame(false); setCurrentState(StateGame.WAIT); data.set_State(StateGame.WAIT); }}>RETRY</button>
                    {/* <div>
                        <ParticleWinner />
                    </div> */}
                </div>)
    return (
        <>
            <div className={style.splashScreen}>
                <h2>Game Over</h2>
                {myVar}
            </div>
        </>
    )
}