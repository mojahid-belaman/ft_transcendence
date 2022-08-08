import { useEffect, useState } from 'react';
import classes from './ChatHeader.module.css'
import { BiDotsVertical } from "react-icons/bi";
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import socket from '../../Library/Socket';
function GameInvitation(props: any) {

    const acceptInviteHandler = () => {
        console.log("game invitaion accept :");
        if (props.roomGame)
            socket.emit("AcceptGameInvite", props?.roomGame)
    }

    return <div>
        <div className={classes.backdrop}></div>
        <div className={classes.card}>
            <div className={classes.cardContent}>
                <h1>GAME INVITATION</h1>
                <div className={classes.choices}>
                    <button id={classes.check} className={classes.buttons} onClick={acceptInviteHandler}><BsCheckLg /></button>
                    <button id={classes.cross} className={classes.buttons} onClick={props.OpenClose}><BsXLg /></button>
                </div>
            </div>
        </div>
    </div>
}

function WaitingInvitation(props: any) {
    return <div>
        <div className={classes.backdrop}></div>
        <div className={classes.card}>
            <div className={classes.cardContent}>
                <h1>Waiting...</h1>
            </div>
        </div>
    </div>
}
function ChatHeader(props: any) {
    const [backdrop1, setBackdrop1] = useState(false);
    const [backdrop2, setBackdrop2] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false)
    const [roomGame, setRoomGame] = useState({});

    const unfriendHandler = () => socket.emit("RemoveFriendship", { friendId: props.user.userId })
    const blockdHandler = () => socket.emit("blockFriend", { blockedUserId: props.user.userId })

    socket.on("RemoveFriend", (data) => {
        props.setAllowed(false)
        props.setMessage(data.message)
    })

    socket.on("RemoveBlockedFriend", (data) => {
        props.setAllowed(true)
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

    socket.on("InviteToGameSent", (data: any) => {
        setRoomGame({...data?.room})
        setBackdrop2(true)
    })

    const sendInvitationHandler = () => {
        socket.emit("inviteToGame", { userId: props.user.userId })
        setIsWaiting(true)
    }

    useEffect(() => {
        return () => {
            socket.off("RemoveFriend");
            socket.off("RemoveBlockedFriend");
            socket.off("InviteToGameSent");
        }
    }, [])

    return props.user ? (<div className={classes.chatWrapper}>
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
                        <button onClick={ ()=> sendInvitationHandler()} className={classes.button}>Game Invitation</button>
                        <button onClick={unfriendHandler} className={classes.button}>Unfriend</button>
                        <button onClick={blockdHandler} className={classes.button}>Block</button>
                    </div>
                </div>
                : null
            }
        </button>
        {backdrop2 ? <GameInvitation roomGame={roomGame} OpenClose={OpenCloseModal2} {...props.user} /> : null}
        {isWaiting ? <WaitingInvitation OpenClose={OpenCloseModal2} {...props.user} /> : null}

    </div>) : <></>
}
export default ChatHeader