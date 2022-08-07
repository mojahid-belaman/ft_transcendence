import { useEffect, useState } from 'react';
import classes from './ChatHeader.module.css'
import { BiDotsVertical } from "react-icons/bi";
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import socket from '../../Library/Socket';
function GameInvitation(props: any) {
    return <div>
        <div className={classes.backdrop}></div>
        <div className={classes.card}>
            <div className={classes.cardContent}>
                <h1>GAME INVITATION</h1>
                <div className={classes.choices}>
                    <button id={classes.check} className={classes.buttons} onClick={props.OpenClose}><BsCheckLg/></button>
                    <button id={classes.cross} className={classes.buttons} onClick={props.OpenClose}><BsXLg/></button>
                </div>
            </div>
        </div>
    </div>
}
function ChatHeader(props: any) {
    const [backdrop1, setBackdrop1] = useState(false);
    const [backdrop2, setBackdrop2] = useState(false);

    const unfriendHandler = () => socket.emit("RemoveFriendship", {friendId: props.user.userId})
    const blockdHandler = () => socket.emit("blockFriend", {blockedUserId: props.user.userId})

    socket.on("RemoveFriend", (data) => {
        props.setAllowed(false)
        props.setMessage(data.message)
    })

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

    useEffect(() => {
        console.log(props.user);
    }, [])

    return props.user ? (
        <div className={classes.chatWrapper}>
        <button className={classes.chatHeader} onClick={props.toggle} >
            <img src={props.user.avatar}></img>
            <div className={classes.info}>
                <div>{props.user.name}</div>
                <div>{props.user.isOnline ? "Online" : "Offline"}  </div>
            </div>
        </button>
        <button onClick={OpenCloseModal1} className={classes.buttonSetting}><BiDotsVertical />
        {backdrop1 ?
            <div className={classes.divUser}>
                <div className={classes.userHandler}>
                    <button onClick={() => { OpenCloseModal2(); OpenCloseModal1() }} className={classes.button}>Game Invitation</button>
                    <button onClick={unfriendHandler} className={classes.button}>Unfriend</button>
                    <button onClick={blockdHandler} className={classes.button}>Block</button>
                </div>
            </div> 
            : null
        }
        </button>
        
        {backdrop2 ? <GameInvitation OpenClose={OpenCloseModal2} /> : null}

    </div>) : <></>
}
export default ChatHeader