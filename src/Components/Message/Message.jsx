import React from "react"; // Importerar react
import "./Message.css"; // Importerar css fil

function Message({ id, text, isOwner, deleteMessage, avatar, username }) {
  // Här börjar Message-funktionen, som tar emot props som används för att rendera meddelandet
  const ownerUsername = sessionStorage.getItem("username"); // Hämtar användarnamnet för den inloggade användaren från sessionStorage
  const ownerAvatar = sessionStorage.getItem("avatar");
  const selectedAvatar = isOwner ? ownerAvatar : avatar;
  const selectedUsername = isOwner ? ownerUsername : username; // Väljer vilket användarnamn som ska visas - om meddelandet tillhör ägaren visas ägarens användarnamn, annars det användarnamn som skickats in som prop

  return (
    <div className={isOwner ? "message-right" : "message-left"}>
      {/* div-klass som ställs in beroende på om meddelandet tillhör ägaren eller inte. Det bestämmer om meddelandet ska visas till höger eller vänster */}

      <div className="message-bubble">
        {/* En bubbla som visar meddelandetexten och användarinformationen */}

        <div className="message-bubble-text">{text}</div>
        {/* Här visas själva texten i meddelandet */}

        <div className="message-bubble-user">
          {/* Här visas användarinformationen, även avatar och användarnamn */}

          <img className="message-avatar" src={selectedAvatar} />
          {/* Visar användarens avatarbild */}

          {selectedUsername && <span>{selectedUsername}</span>}
          {/* Visar användarnamnet om det finns något */}
        </div>
      </div>

      {
        isOwner && (
          <button
            className="message-delete-button"
            onClick={() => deleteMessage(id)}
          >
            Delete
          </button>
        )
        // Visar en raderingsknapp endast om meddelandet tillhör den inloggade ägaren. När knappen trycks anropas deleteMessage-funktionen med meddelandets id
      }
    </div>
  );
}
export default Message;
