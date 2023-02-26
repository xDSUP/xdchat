import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {Client, StompSubscription} from "@stomp/stompjs";
import {getStompSocketUrl} from "../utils/fetchUtils";
import {StompHeaders} from "@stomp/stompjs/src/stomp-headers";

interface StompContextProps {
    subscribe: (topic: string, callback: (message: string) => void) => StompSubscription | void;
    publish: (topic: string, message: string) => void;
    unsubscribe: (topic: string) => void;
    client: Client | null;
}

const StompContext = createContext<StompContextProps>({
    subscribe: () => {
    },
    publish: () => {
    },
    unsubscribe: () => {
    },
    client: null,
});

function StompProvider(props: { children: React.ReactNode }) {
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        let client = new Client({
            brokerURL: getStompSocketUrl().href,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        const onDisconnected = () => {
            console.log("Stomp disconnected!!");
            setClient(client);
        }

        const onConnected = () => {
            console.log("Stomp connected!!");
            setClient(client);
        };
        client.onConnect = onConnected;
        client.onDisconnect = onDisconnected;
        client.activate()

        return () => {
            client?.deactivate();
        }
    }, []);

    const stompContextValue = useMemo(() => {
        return {
            subscribe: (topic: string, callback: (message: string) => void) => {
                console.debug(`Subcribe on topic: ${topic}`)
                return client?.subscribe(topic, (message) => {
                    console.debug(`Recive from topic: ${topic} body: ${message.body}`)
                    callback(message.body);
                });
            },
            unsubscribe: (topic: string) => {
                client?.unsubscribe(topic);
            },

            publish: (topic: string, body: string, headers?: StompHeaders) => {
                console.debug(`publish on topic: ${topic} with body: ${body}`)
                client?.publish({destination: topic, body: body, headers: headers})
            },
            client: client,
        }
    }, [client])

    return (
        <StompContext.Provider value={stompContextValue}>
            {props.children}
        </StompContext.Provider>
    );
}

function useStomp() {
    return useContext(StompContext);
}

export {StompProvider, useStomp};