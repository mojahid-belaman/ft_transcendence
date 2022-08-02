import classes from "./Profile.module.css"
function History() {
    return (
        <div className={classes.history}>
            <div className={classes.historyCard}>
                <div id={classes.start}>
                    <img className={classes.userImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                    <h2>name</h2>
                </div>
                <h2>vs</h2>
                <div id={classes.end}>
                    <h2>name</h2>
                    <img className={classes.userImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
function TopTen() {
    return (
        <div className={classes.history}>
            <div className={classes.historyCard}>
                <div id={classes.start}>
                    <img className={classes.userImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                    <h2>name</h2>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
function Profile() {
    return <div className={classes.mainProfile}>
        <div className={classes.cardsProfile}>
            <div className={classes.profileInfo}>
                <img className={classes.image} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                <div className={classes.info}>
                    <h2>Name:   soukaina</h2>
                    <h2>Login:  shikma</h2>
                    <h2>Wins:   10</h2>
                    <h2>Loses:  10</h2>
                </div>

            </div>
        </div>
        <div className={classes.profileBoard}>
            <fieldset className={classes.cardsBoard}>
                <legend className={classes.legend}><h1>History:</h1></legend>
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
            </fieldset>
            <fieldset className={classes.cardsBoard}>
                <legend className={classes.legend}><h1>Top 10:</h1></legend>
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
                <TopTen />
            </fieldset>
        </div>

    </div>
}

export default Profile;