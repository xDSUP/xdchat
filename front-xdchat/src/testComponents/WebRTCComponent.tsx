import React, {useEffect, useRef, useState} from 'react'

const WebRTCComponent: React.FC = () => {
    const [text, setText] = useState('')
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    let peerConnection: RTCPeerConnection | null = null
    let [rtcDataChannel, setRtcDataChannel] = useState<RTCDataChannel | null>(null)

    const rtcConfiguration: RTCConfiguration = {
        iceServers: [
            {urls: 'stun:stun.l.google.com:19302'},
        ],
    };

    const socketUrl = 'ws://localhost:8080/webrtc/signalling'

    useEffect(() => {
        if (socket != null)
            socket.onopen = () => {
                console.log("Connected to the signaling server")
                initialize()
            }
    }, [socket])

    useEffect(() => {
        const newSocket = new WebSocket(socketUrl)
        setSocket(newSocket)
        newSocket.onopen = () => {
            console.log("123123123123")
        }
        newSocket.onclose = () => console.log('WebSocket connection closed')
    }, [])

    const sendMessageUseWebsocket = (message: Object) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    }

    function initialize() {
        const newPeerConnection = new RTCPeerConnection(rtcConfiguration)
        if (socket != null)
            socket.onmessage = (msg) => {
                console.log("Got message", msg.data);
                let content = JSON.parse(msg.data);
                let data = content.data;
                switch (content.event) {
                    case "offer":
                        peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
                        peerConnection?.createAnswer()
                            .then((answer) => {
                                peerConnection?.setLocalDescription(answer);
                                sendMessageUseWebsocket({
                                    event: "answer",
                                    data: answer
                                });
                            }, (error) => alert("Error creating an answer"));
                        break;
                    case "answer":
                        peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
                        console.log("connection established successfully!!");
                        break;
                    case "candidate":
                        peerConnection?.addIceCandidate(new RTCIceCandidate(data));
                        break;
                    default:
                        break;
                }
            }
        peerConnection = newPeerConnection
        newPeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                sendMessageUseWebsocket({
                    event: "candidate",
                    data: event.candidate
                });
            }
        };

        const newRtcDataChannel = newPeerConnection.createDataChannel("dataChannel");
        setRtcDataChannel(newRtcDataChannel)
        newRtcDataChannel.onopen = () => console.log("Open data channel")
        newRtcDataChannel.onerror = (error) => console.log("Error occured on datachannel:", error)
        newRtcDataChannel.onmessage = (event) => {
            console.log(event.data)
            setText(JSON.parse(event.data).text)
        }
        newRtcDataChannel.onclose = () => console.log("data channel is closed")
        newPeerConnection.ondatachannel = (event) => setRtcDataChannel(event.channel)
        newPeerConnection.createOffer()
            .then((offer) => {
                sendMessageUseWebsocket({
                    event: "offer",
                    data: offer
                });
                newPeerConnection.setLocalDescription(offer);
            }, (error) => console.log("data channel is closed"))

    }

    const sendMessageUseWebRTC = (message: Object) => {
        console.log(rtcDataChannel)
        rtcDataChannel?.send(JSON.stringify(message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setText(text);
        sendMessageUseWebRTC({type: 'text', text});
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleInputChange} ref={inputRef}/>
        </div>
    );
};

export default WebRTCComponent;