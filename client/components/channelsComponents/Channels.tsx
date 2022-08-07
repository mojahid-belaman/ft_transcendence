import classes from "./Channels.module.css";

<<<<<<< HEAD
import { useContext, useEffect, useRef, useState } from 'react';
import DataChannel from './data_context/data-context';
import ChannelCard from './ChannelCard';
import Chat from './chat/Chat';
import NewChannel from './newChannel/NewChannel';
import { useRouter } from 'next/router';
import socket from '../Library/Socket';
import axios from 'axios';
import Cookies from 'js-cookie';
=======
import { useContext, useEffect, useState } from "react";
import DataChannel from "./data_context/data-context";
import ChannelCard from "./ChannelCard";
import Chat from "./chat/Chat";
import NewChannel from "./newChannel/NewChannel";
import { useRouter } from "next/router";
import socket from "../Library/Socket";
>>>>>>> 7d93243dee28086c50c910fb8af93d0fc1285713

export enum channelStatus {
  PUBLIC = "Public",
  PRIVATE = "Private",
  PROTECTED = "Protected",
}

function PrivateCard() {
  return (
    <div className={classes.privateDiv}>
      <div className={classes.privateCard}>This Chat Room is Private !</div>
    </div>
  );
}

<<<<<<< HEAD
function ProtectedCard(props: any) {
    const [error, setError] = useState("")
    const passwordRef: any = useRef();

    const joinChannel = async (e: any) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const data = {
            password,
            channelId: props.channel.channelId
        }
        const token = Cookies.get("access_token");
        await axios.post(`http://localhost:5000/channels/joinChannel`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(async (data) => {
            console.log(data);
            props.setStatus(channelStatus.PUBLIC);
        })
        .catch(err => setError(err.response.data.message))
    }

    return (
        <form className={classes.passwordDiv}>
            <div className={classes.password}>
                <label> Enter password : </label>
                <input type="password" name="name" required ref={passwordRef} />
                <button className={classes.buttons} onClick={joinChannel}>Join</button>
                <div>{error}</div>
            </div>
        </form>)
}

function ChannelsComponent() {
    const router = useRouter();
    const [channel, setChannel] = useState(router.query.channel !== undefined ? router.query.channel : false);
    const [backdrop, setBackdrop] = useState(false);
    const [status, setStatus] = useState("");
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const dataChannelVar = useContext(DataChannel);


    socket.on("JoinedOrNot", (data) => setStatus(data.status));
=======
function ProtectedCard() {
  return (
    <form className={classes.passwordDiv}>
      <div className={classes.password}>
        <label> Enter password : </label>
        <input type="password" name="name" required />
        <button className={classes.buttons}>Join</button>
      </div>
    </form>
  );
}

function ChannelsComponent() {
  const router = useRouter();
  const [channel, setChannel] = useState(
    router.query.channel !== undefined ? router.query.channel : false
  );
  const [backdrop, setBackdrop] = useState(false);
  const [status, setStatus] = useState("");
  function OpenCloseModal() {
    if (backdrop === false) setBackdrop(true);
    else setBackdrop(false);
  }
  const dataChannelVar = useContext(DataChannel);
>>>>>>> 7d93243dee28086c50c910fb8af93d0fc1285713

  socket.on("JoinedOrNot", (data) => setStatus(data.status));

  useEffect(() => {}, []);

<<<<<<< HEAD
        </div>
        {
            status == channelStatus.PUBLIC ? <Chat channel={dataChannelVar.selectedConversation} /> :
                status === channelStatus.PRIVATE ? <PrivateCard /> :
                    status === channelStatus.PROTECTED ? <ProtectedCard channel={dataChannelVar.selectedConversation} setStatus={setStatus}/> : null
        }
        {backdrop ? <NewChannel setBackdrop={setBackdrop} OpenClose={OpenCloseModal} /> : null}
=======
  return (
    <div className={classes.mainCard}>
      <div className={classes.channelList}>
        <button onClick={OpenCloseModal} className={classes.createChannel}>
          <div className={classes.text}>Create Channel</div>
        </button>
        {dataChannelVar.data.map((channel: any) => (
          <div
            key={channel.channelId}
            onClick={() => {
              // socket.join(channel.channelId);
              setChannel(channel.channelId);
              socket.emit("joinChannel", channel.channelId);
              router.push(`channels?name=${channel.name}`);
            }}
          >
            <ChannelCard
              key={channel.channelId}
              channel={channel}
              setStatus={setStatus}
            />
          </div>
        ))}
      </div>
      {status == channelStatus.PUBLIC ? (
        <Chat channel={dataChannelVar.selectedConversation} />
      ) : status === channelStatus.PRIVATE ? (
        <PrivateCard />
      ) : status === channelStatus.PROTECTED ? (
        <ProtectedCard />
      ) : null}
      {backdrop ? (
        <NewChannel setBackdrop={setBackdrop} OpenClose={OpenCloseModal} />
      ) : null}
>>>>>>> 7d93243dee28086c50c910fb8af93d0fc1285713
    </div>
  );
}

export default ChannelsComponent;
