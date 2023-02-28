import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useMessages} from "../hooks/useMessages";
import {MessageList} from "../components/messageList";
import TestRealTimeField from "../testComponents/TestRealTimeField";
import {useAuthorizedUser} from "../contexts/authContext";

export function Chat() {
    const [message, setMessage] = useState("");
    const user = useAuthorizedUser();
    const {messages, sendMessage, clearMessages} = useMessages();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, []);

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage({userName: user.username, text: message});
            setMessage("");
        }
    };

    return (
        <>
            <div className="App">
                <h1>Simple Chat</h1>
                <MessageList currentUserName={user.username} messages={messages}/>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                handleSendMessage()
                            }
                        }}
                        onChange={handleMessageChange}
                        ref={inputRef}
                    />
                </div>
                <div className="input-container">
                    <button onClick={clearMessages}>Clear</button>
                    <button onClick={handleSendMessage}>Send</button>
                </div>

            </div>
            <TestRealTimeField/>
            {/*<WebSocketTest />*/}
        </>
    );
}