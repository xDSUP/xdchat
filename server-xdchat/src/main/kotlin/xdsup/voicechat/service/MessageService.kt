package xdsup.voicechat.service

import org.springframework.stereotype.Service
import xdsup.voicechat.entity.Message

@Service
class MessageService {
    private val messages = mutableListOf<Message>()

    fun getAllMessages(): List<Message> = messages.toList()

    fun addMessage(message: Message): Boolean = messages.add(message)

    fun removeAllMessages() = messages.clear()
}
