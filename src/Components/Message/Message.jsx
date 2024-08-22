import React from "react";
import "./Message.css";

function Message({ id, text, isOwner, deleteMessage }) {
  return (
    <div>
       <div className={isOwner ? 'messsage-right' : 'message-left'}>
      meddelande: {text} - {isOwner && (<button onClick={() => deleteMessage(id)}>Delete</button>)}
    </div>
    </div>
  );
}

export default Message;
