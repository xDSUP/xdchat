import {useState} from "react";
import {api, apiGet, Method} from "../utils/fetchUtils";

export interface Message {
    isUser: boolean;
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

    const sendMessage = (currentUserName: string, message: string) => {
        api<Array<MessageDTO>>(MESSAGES_URL, Method.POST, {userName: currentUserName, text: message}).then(() => {
            loadMessages(currentUserName)
        })
    }

    const clearMessages = () => {
        api(MESSAGES_URL, Method.DELETE)
    }

    const loadMessages = (currentUserName: string) => {
        apiGet<Array<MessageDTO>>(MESSAGES_URL).then(
            messages => {
                setMessages(messages.map(message => ({...message, isUser: message.userName === currentUserName})))
            }
        )
    }

    return {messages, sendMessage, clearMessages, loadMessages};
}