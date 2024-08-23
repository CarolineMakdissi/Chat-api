import React from "react";
import "./Message.css";

function Message({ id, text, isOwner, deleteMessage, avatar, username }) {
  const ownerUsername = sessionStorage.getItem('username');
  const ownerAvatar = sessionStorage.getItem('avatar');
  const selectedAvatar = isOwner ? ownerAvatar: avatar;
  const selectedUsername = isOwner ? ownerUsername : username;
  return (
    <div className={isOwner ? "message-right" : "message-left"}>
      <div className="message-bubble">
       <div className="message-bubble-text">{text}</div> 
       <div className="message-bubble-user">
        <img className="message-avatar" src={selectedAvatar} /> {selectedUsername &&<span>{selectedUsername}</span>}
       </div>
      </div>
      {isOwner && <button className="message-delete-button" onClick={() => deleteMessage(id)}>Delete</button>}
    </div>
  );
}

export default Message;
