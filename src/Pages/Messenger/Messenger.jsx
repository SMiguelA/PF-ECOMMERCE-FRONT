import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversation from "../../Components/Conversations/Conversation";
import Message from "../../Components/Message/Message";
import axios from "../../axios";
import "./messenger.css";

export default function Messenger() {
  const user = useSelector((state) => state.user);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      // Mostrar una alerta si la respuesta del servidor contiene un error
      console.log(res.data, " este es ress data");
      if (res.data.error) {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "User won't exist or is disconnected. Try again later..."
      );
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Used for create a conversation
  const users = useSelector((state) => state.users);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [senderId, setSenderId] = useState(""); // Estado para almacenar el senderId
  const [receiverId, setReceiverId] = useState(""); // Estado para almacenar el receiverId

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEmail(selectedValue);
    const selectedUser = users.find((user) => user.email === selectedValue);
    const senderId = user ? user._id : "";

    if (selectedUser) {
      setSenderId(senderId);
      setReceiverId(selectedUser.id);
    }
  };

  const handleSendRequest = () => {
    axios
      .post("/conversations", { senderId, receiverId })
      .then((response) => {
        setConversations([...conversations, response.data]);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  };

  const emailOptions = users.map((user) => (
    <option key={user.id} value={user.email}>
      {user.email}
    </option>
  ));

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <select value={selectedEmail} onChange={handleSelectChange}>
              <option value="">Select email</option>
              {emailOptions}
            </select>

            <button onClick={handleSendRequest}>Enviar solicitud</button>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      {console.log(messages, "messages")}
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        pictureOwn={user.profilePicture}
                        pictureSender="TEST"
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  {errorMessage && <div className="error">{errorMessage}</div>}
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
