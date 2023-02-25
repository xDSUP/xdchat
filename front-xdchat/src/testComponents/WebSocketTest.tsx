import React, { useState, useEffect } from 'react';

const WebSocketTest = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [voiceMessage, setVoiceMessage] = useState<string>('');

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/api/voice');

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
            setSocket(newSocket);
        };

        newSocket.onmessage = (event) => {
            console.log('Received voice message:', event.data);
        };

        newSocket.onerror = (event) => {
            console.error('WebSocket error:', event);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        };

        return () => {
            if (newSocket.readyState === 1) { // <-- This is important
                newSocket.close();
            }
        };
    }, []);

    const handleSendVoiceMessage = () => {
        if (socket) {
            socket.send(voiceMessage);
            console.log('Sent voice message:', voiceMessage);
            setVoiceMessage('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={voiceMessage}
                onChange={(event) => setVoiceMessage(event.target.value)}
            />
            <button onClick={handleSendVoiceMessage}>Send Voice Message</button>
        </div>
    );
};

export default WebSocketTest;
