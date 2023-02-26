package xdsup.voicechat.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.*
import xdsup.voicechat.websocket.handlers.VoiceWebSocketHandler


@Configuration
@EnableWebSocket
class WebSocketConfig : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(VoiceWebSocketHandler(), "/voice")
            .setAllowedOrigins("*")
    }
}

@Configuration
@EnableWebSocketMessageBroker
class WebSocketStompConfig : WebSocketMessageBrokerConfigurer {
    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/stomp").setAllowedOrigins("*")
    }

    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        config.setApplicationDestinationPrefixes("/app", "/chat")
        config.enableSimpleBroker("/topic", "/queue")
    }
}