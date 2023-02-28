import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./app.css";
import {MessageList} from "./components/MessageList";
import TestRealTimeField from "./testComponents/TestRealTimeField";
import {useMessages} from "./hooks/useMessages";
import WebRTCComponent from "./testComponents/WebRTCComponent";

function App() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const {messages, sendMessage, clearMessages} = useMessages();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, []);

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage({userName: username, text: message});
            setMessage("");
        }
    };

    return (
        <>
            <div className="App">
                <h1>Simple Chat</h1>
                <div className="username-container">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <MessageList currentUserName={username} messages={messages}/>

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
            <WebRTCComponent />
            {/*<TestRealTimeField />*/}
            {/*<WebSocketTest />*/}
        </>
    );
}

export default App;
