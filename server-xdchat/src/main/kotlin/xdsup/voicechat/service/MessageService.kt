package xdsup.voicechat.service

import org.springframework.stereotype.Service

@Service
class MessageService {
    private val messages = mutableListOf<String>()

    fun getAllMessages(): List<String> = messages.toList()

    fun addMessage(message: String): Boolean = messages.add(message)

    fun removeAllMessages() = messages.clear()
}
