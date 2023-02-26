import React, { useState, useEffect, useRef } from 'react';

const TestRealTimeField: React.FC = () => {
    const [text, setText] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message.type === 'text') {
                setText(message.text);
            }
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setText(text);

        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ type: 'text', text });
            socket.send(message);
        }
    };

    const handleConnectWebSocket = () => {
        const socketUrl = 'ws://localhost:8080/api/voice';
        const newSocket = new WebSocket(socketUrl);
        setSocket(newSocket);

        newSocket.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        newSocket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    };

    const handleDisconnectWebSocket = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
        setSocket(null);
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleInputChange} ref={inputRef} />
            <button onClick={handleConnectWebSocket}>Connect WebSocket</button>
            <button onClick={handleDisconnectWebSocket}>Disconnect WebSocket</button>
        </div>
    );
};

export default TestRealTimeField;