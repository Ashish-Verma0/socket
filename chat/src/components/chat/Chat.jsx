import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import socketIo from "socket.io-client";
import "../chat/Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/Message";

let socket;
const ENDPOINT = "http://localhost:8081";

const Chat = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    socket.emit("message", { message, id });
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });

    // yaha se hmm backend me data bhej rahe hai
    socket.emit("joined", { userName });
    // yaha se hmm backend me data bhej rahe hai

    // ye wala backend se data aa raha hai
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    // ye wala backend se data aa raha hai

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("logout", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return ()=>{
        socket.off()
    }
  }, [messages]);

  const [userName, setUserName] = useState(location.state.name);
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"> 
        <h2>Chat App</h2>
        <a href="/"><img src="https://dictionary.cambridge.org/images/thumb/cross_noun_002_09265.jpg?version=5.0.252" alt="close"/></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((elem, index) => (
            <Message message={elem.message} classs={elem.id===id?"right":"left"} user={elem.id===id?"":elem.user}/>
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            id="chatInput"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn" onClick={send}>
            <img
              src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png"
              alt="logo"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
