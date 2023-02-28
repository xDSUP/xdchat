import React from "react";
import {Message} from "../hooks/useMessages";

export class MessageList extends React.Component<{ currentUserName: string, messages: Array<Message> }> {
    render() {
        return <div className="message-container">
            {
                this.props.messages.map((message, index) => (

                    <div
                        className={message.userName === this.props.currentUserName ? "user-message" : "another-message"}
                        key={index}
                    >
                        {
                            message.userName !== this.props.currentUserName &&
                            <span className="message-username">{message.userName}</span>
                        }
                        {message.text}
                    </div>
                ))
            }
        </div>;
    }
}