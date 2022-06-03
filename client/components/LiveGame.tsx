import styles from '../styles/LiveGame.module.css'

function LiveGame() {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.dataOne}>
                <img src='/noimg.png' width='200px' height='200px'/>
                <span>Mojahid</span>
            </div>
            <div className={styles.dataTwo}>
                <span>Ayoub</span>
                <img src='/noimg.png' width='200px' height='200px'/>
            </div>
        </div>
        
    </div>
  )
}

export default LiveGame