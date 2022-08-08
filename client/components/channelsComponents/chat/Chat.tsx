import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import socket from "../../Library/Socket";
import { connectionStatus } from "../profileModal/ChannelInfo";
import ProfileModal from "../profileModal/ProfileModal";
import classes from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import MessageCard from "./MessageCard";
function Chat(props: any) {
  const [backdrop, setBackdrop] = useState(false);
  const [error, setError] = useState("");

  function OpenCloseModal() {
    if (backdrop === false) setBackdrop(true);
    else setBackdrop(false);
  }
  const [messagelist, setMessageList]: any = useState([]);
  const [CurentMessage, setCurentMessage]: any = useState("");
  function Message() {
    if (CurentMessage !== "") {
      socket.emit("SendMessageChannel", {
        channel: props.channel.channelId,
        CurentMessage,
      });
      setCurentMessage("");
    }
  }

  socket.on("receiveMessageChannel", (data) => {
    setMessageList([...messagelist, data]);
  });

  socket.on("channelConnectionStatusChange", (data) => {
    //console.log("After one minute => ", data);
    if (data.status === connectionStatus.BLOCKED)
      setError("Error(from Socket): " + data.error);
    else setError("");
  });

  const getCurrentConv = async () => {
    const token = Cookies.get("access_token");
    await axios
      .get(
        `${process.env.BACK_END_URI}/channels/messages/${props.channel.channelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setMessageList([...res.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError("Error: " + err.response.data.message);
      });
  };

  useEffect(() => {
    if (props.channel) getCurrentConv();
  }, [props.channel]);
  const messageEndRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messagelist]);
  return error === "" ? (
    <div className={classes.chatCard}>
      <ChatHeader toggle={OpenCloseModal} channel={props.channel} />
      <div className={classes.chatContent}>
        <div className={classes.chatMessages}>
          {messagelist.map((message: any, index: number) => (
            <MessageCard key={index} message={message} />
          ))}
          <div ref={messageEndRef}/>
        </div>
        <div className={classes.chatFooter}>
          <input
            value={CurentMessage}
            placeholder="  Hey..."
            type="text"
            onChange={(event) => {
              setCurentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                Message();
              }
            }}
          />
          <button onClick={Message}>&#9658;</button>
        </div>
        {backdrop ? (
          <ProfileModal channel={props.channel} OpenClose={OpenCloseModal} />
        ) : null}
      </div>
    </div>
  ) : (
    <>{error}</>
  );
}

export default Chat;
