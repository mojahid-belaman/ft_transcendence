import  ParticleWinner  from "./ParticleWinner";
import  ParticleBackground  from "./ParticleBackground";
import style from '../styles/GameOver.module.css'

export function GameOver({curData}: any) {
    let myVar = (curData.get_Winner() ? 
                <div className={style.loser}>
                    You Lose
                    <div>
                        <ParticleBackground />
                    </div>
                </div> : 
                <div className={style.win}>
                    You Win
                    <div>
                        <ParticleWinner />
                    </div>
                </div>)
    console.log(myVar);
    return (
        <div className={style.splashScreen}>
            <h2>Game Over</h2>
            {myVar}
        </div>
    )
}