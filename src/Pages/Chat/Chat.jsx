import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../Context/AuthContext";
import "./Chat.css";
import Message from "../../Components/Message/Message";

const messageUrl = "https://chatify-api.up.railway.app/messages";

const fakeMessages = [
  {
    id: 3939,
    text: "Hello, world!",
    conversationId: "550e8400-e29b-41d4-a716-446655440000",
    isFake: true,
  },
];

function Chat() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [convId, setConvId] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        messageUrl,
        {
          text: newMessage,
          converstationId: convId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const latestMessage = resp.data.latestMessage;
      // när den lyckas då lägger vi meddelandet state, dessutom lägger vi en fake som svar
      const newArray = messages.concat([latestMessage, fakeMessages[0]]);
      setMessages(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchMessage() {
    try {
      let converstationId = sessionStorage.getItem("conversationId") || "";

      // om inte konversationsID finns, generera ett och spara i localStorage
      if (!converstationId) {
        converstationId = uuid();
        sessionStorage.setItem("conversationId", converstationId);
        setConvId(converstationId);
      } else {
        setConvId(converstationId);
      }

      //Hämta message från specifik user by userId eller/och konversation - useEffect
      const messageResponse = await axios.get(
        `${messageUrl}?converstationId=${converstationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const messages = messageResponse.data;
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage() {
    try {
      await axios.delete(
        `https://chatify-api.up.railway.app/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // hämta om meddelanden efter man tagit bort
      fetchMessage();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) fetchMessage();
  }, [token]);

  return (
    <div>
      <div className="message-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            isOwner={!message.isFake}
            deleteMessage={deleteMessage}
          />
        ))}
      </div>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write message here"
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
