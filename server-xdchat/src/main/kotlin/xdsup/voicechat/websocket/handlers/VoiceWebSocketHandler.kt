package xdsup.voicechat.websocket.handlers

import org.slf4j.LoggerFactory
import org.springframework.web.socket.*

class VoiceWebSocketHandler : WebSocketHandler {
    private val log = LoggerFactory.getLogger(VoiceWebSocketHandler::class.java)
    private val sessions = mutableSetOf<WebSocketSession>()

    override fun afterConnectionEstablished(session: WebSocketSession) {
        sessions.add(session)
        log.info("WebSocket connection established")
    }

    override fun handleMessage(senderSession: WebSocketSession, message: WebSocketMessage<*>) {
        for (session in sessions)
            if (session != senderSession)
                session.sendMessage(message)
    }

    override fun handleTransportError(session: WebSocketSession, exception: Throwable) {
        log.info("WebSocket transport error: ${exception.message}")
    }

    override fun afterConnectionClosed(session: WebSocketSession, closeStatus: CloseStatus) {
        sessions.remove(session)
        log.info("WebSocket connection closed")
    }

    override fun supportsPartialMessages(): Boolean {
        return false
    }
}