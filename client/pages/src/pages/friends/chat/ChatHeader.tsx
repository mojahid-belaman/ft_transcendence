import { useState } from 'react';
import classes from './ChatHeader.module.css'
import { BiDotsVertical } from "react-icons/bi";
function GameInvitation(props:any) {
    return <div>
        <div className={classes.backdrop}></div>
        <div className={classes.card}>
            <div className={classes.cardContent}>
                <h1>GAME INVITATION</h1>
                <div className={classes.choices}>
                    <button id={classes.check} className={classes.buttons} onClick={props.OpenClose}><i className="fa-solid fa-check"></i></button>
                    <button id={classes.cross} className={classes.buttons} onClick={props.OpenClose}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        </div>
    </div>
}
function ChatHeader(props:any) {
    const [backdrop1, setBackdrop1] = useState(false);
    const [backdrop2, setBackdrop2] = useState(false);
    function OpenCloseModal1() {
        if (backdrop1 === false)
            setBackdrop1(true);
        else
            setBackdrop1(false);
    }
    function OpenCloseModal2() {
        if (backdrop2 === false)
            setBackdrop2(true);
        else
            setBackdrop2(false);
    }
    return (<div className={classes.chatWrapper}>
        <button className={classes.chatHeader} onClick={props.toggle} >
            <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div className={classes.info}>
                <div>{props.user.name}</div>
                <div>Online </div>
            </div>
        </button>
        <button onClick={OpenCloseModal1} className={classes.buttonSetting}><BiDotsVertical/></button>
        {backdrop1 ?                                                                                                                                                                                                                                                          
        <div className={classes.userHandler}>
             <button onClick={()=>{OpenCloseModal2(); OpenCloseModal1()}} className={classes.button}>Game Invitation</button>
             <button  onClick={OpenCloseModal1} className={classes.button}>Unfriend</button>
             <button  onClick={OpenCloseModal1} className={classes.button}>Block</button>
        </div>:null
    }
    {backdrop2 ? <GameInvitation OpenClose={OpenCloseModal2}  /> : null}
        
    </div>)
}
export default ChatHeader