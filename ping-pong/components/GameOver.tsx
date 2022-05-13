import  ParticleWinner  from "./ParticleWinner";
import  ParticleBackground  from "./ParticleBackground";
import style from '../styles/GameOver.module.css'

export function GameOver({curData}: any) {
    let myVar = (curData.get_Winner() ? <div className={style.loser}>You Loser</div> : <div className={style.win}>You Win<ParticleWinner /></div>)
    console.log(myVar);
    return (
        <div className={style.splashScreen}>
            <h2>Game Over</h2>
            {myVar}
        </div>
    )
}