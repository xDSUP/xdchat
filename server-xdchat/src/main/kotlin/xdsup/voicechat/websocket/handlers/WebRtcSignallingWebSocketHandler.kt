package xdsup.voicechat.websocket.handlers

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.io.IOException
import java.util.concurrent.CopyOnWriteArrayList


@Component
class WebRtcSignallingWebSocketHandler : TextWebSocketHandler() {
    private val log = LoggerFactory.getLogger(VoiceWebSocketHandler::class.java)
    var sessions: MutableList<WebSocketSession> = CopyOnWriteArrayList()

    @Throws(InterruptedException::class, IOException::class)
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        for (webSocketSession in sessions) {
            if (webSocketSession.isOpen && session.id != webSocketSession.id) {
                webSocketSession.sendMessage(message)
            }
        }
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        log.info("WebSocket connection established")
        sessions.add(session)
    }

    override fun handleTransportError(session: WebSocketSession, exception: Throwable) {
        log.info("WebSocket transport error: ${exception.message}")
    }

    override fun afterConnectionClosed(session: WebSocketSession, closeStatus: CloseStatus) {
        sessions.remove(session)
        log.info("WebSocket connection closed")
    }
}