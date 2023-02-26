import {useEffect, useState} from "react";
import {api, apiGet, Method} from "../utils/fetchUtils";
import {useStomp} from "../contexts/stompContext";

export interface Message {
    text: string;
    userName: string;
}

export interface MessageDTO {
    text: string;
    userName: string;
}

const MESSAGES_URL = "message";

export function useMessages() {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const {publish, subscribe, client} = useStomp();

    useEffect(() => {
        console.log("loadMessages!!")
        loadMessages()
    }, [])

    useEffect(() => {
        if (client?.connected) { // нам нужно подписаться только когда client уже присоединен к серверу
            const subscription = subscribe('/topic/message', (msg: string) => {
                let message: MessageDTO = JSON.parse(msg);
                setMessages((messages) => [...messages, message]);
            })
            return () => {
                subscription?.unsubscribe();
            };
        }
    }, [client?.connected, subscribe])


    const sendMessage = (message: Message) => {
        publish("/chat/sendMessage", JSON.stringify(message))
    }

    const clearMessages = () => {
        api(MESSAGES_URL, Method.DELETE)
    }

    const loadMessages = () => {
        apiGet<Array<MessageDTO>>(MESSAGES_URL).then(
            messages => {
                setMessages(messages)
            }
        )
    }

    return {messages, sendMessage, clearMessages};
}