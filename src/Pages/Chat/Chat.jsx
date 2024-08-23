import axios from "axios"; // Importerar axios för att hantera http-förfrågningar
import React, { useState, useContext } from "react"; // Importerar useState och UseContext
import { useEffect } from "react"; // Importera useEffect
import { v4 as uuid } from "uuid"; // Importerar uuid och ger den ett alias 'uuid' för att skapa unika id:n.
import { AuthContext } from "../../Context/AuthContext"; // Importerar AuthContext för att få tillgång till autentiseringsinformationen (som token)
import "./Chat.css"; // Importerar css fil
import Message from "../../Components/Message/Message"; // Importerar Message

const messageUrl = "https://chatify-api.up.railway.app/messages"; // URL för API:et där meddelanden hanteras

const fakeMessages = [
  {
    id: "fake-message1",
    text: "Tja tja, hur mår du?",
    avatar: "https://i.pravatar.cc/100?img=14",
    username: "Johnny",
    conversationId: null,
    isFake: true,
  },
  {
    id: "fake-message2",
    text: "Hallå!! Svara då!!",
    avatar: "https://i.pravatar.cc/100?img=14",
    username: "Johnny",
    conversationId: null,
    isFake: true,
  },
  {
    id: "fake-message3",
    text: "Sover du eller?! 😴",
    avatar: "https://i.pravatar.cc/100?img=14",
    username: "Johnny",
    conversationId: null,
    isFake: true,
  },
]; //Fejk lista med meddelande som ska föreställa en konverastion

function getRandomNumber() {
  return Math.floor(Math.random() * 3); // siffra mellan 0 och 2
}

// säkra texten
function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9 ]/g, "");
}

function Chat() {
  const { token } = useContext(AuthContext); // Hämtar autentiseringstoken från AuthContext
  const [messages, setMessages] = useState([]); // State för att lagra meddelanden
  const [newMessage, setNewMessage] = useState(""); // State för att lagra användarens nya meddelande
  const [convId, setConvId] = useState(""); // State för att lagra konversations-ID:t

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        messageUrl,
        {
          text: sanitizeInput(newMessage), // Rensar användarens inmatning
          converstationId: convId, // Skickar konversations-ID:t med meddelandet
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const latestMessage = resp.data.latestMessage;
      // när den lyckas då lägger vi meddelandet state, dessutom lägger vi en fake som svar
      const fakeId = getRandomNumber();
      const newArray = messages.concat([latestMessage, fakeMessages[fakeId]]);
      setMessages(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchMessage() {
    try {
      let converstationId = sessionStorage.getItem("conversationId") || ""; // Försöker hämta konversations-ID från sessionStorage

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
            Authorization: `Bearer ${token}`, // Skickar autentiseringstoken i begäran.
          },
        }
      );
      const messages = messageResponse.data; // Sparar de hämtade meddelandena i state.
      setMessages(messages);
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage(messageId) {
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
    if (token) fetchMessage(); // Hämtar meddelanden när token är tillgängligt
  }, [token]); // Kör useEffect när token ändras

  return (
    <div className="chat-body">
      <div className="message-container">
        {messages.map((message) => (
          <Message
            key={message.id} // Unikt id för varje meddelande.
            id={message.id}
            text={message.text}
            isOwner={!message.isFake} // Markerar om användaren är ägare av meddelandet.
            deleteMessage={deleteMessage} // Radera meddelande
            username={message.username} // Användarnamnet som skickade meddelandet.
            avatar={message.avatar} // img för användaren som skickade meddelandet.
          />
        ))}
      </div>
      <form className="message-input" onSubmit={handleMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Värde för det nya meddelandet som skrivs in.
          placeholder="Write message here"
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
