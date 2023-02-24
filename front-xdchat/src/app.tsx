import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./app.css";
import {useMessages} from "./hooks/useMessages";
import {MessageList} from "./components/MessageList";

function App() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const {messages, sendMessage, clearMessages, loadMessages} = useMessages();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, []);

    useEffect(() => {
        loadMessages(username)
    }, [username]);

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(username, message);
            setMessage("");
        }
    };

    return (
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
            <MessageList messages={messages}/>

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
    );
}

export default App;
