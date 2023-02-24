import React from "react";
import {Message} from "../hooks/useMessages";

export class MessageList extends React.Component<{ messages: Array<Message> }> {
    render() {
        return <div className="message-container">
            {
                this.props.messages.map((message, index) => (
                    <div
                        className={message.isUser ? "user-message" : "another-message"}
                        key={index}
                    >
                        {
                            !message.isUser && <span className="message-username">{message.userName}</span>
                        }
                        {message.text}
                    </div>
                ))
            }
        </div>;
    }
}