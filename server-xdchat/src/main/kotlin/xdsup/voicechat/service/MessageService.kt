package xdsup.voicechat.service

import org.springframework.stereotype.Service
import xdsup.voicechat.entity.Message
import xdsup.voicechat.repository.MessageRepository

@Service
class MessageService(
        private val repository: MessageRepository
) {
    fun getAllMessages(): List<Message> = repository.findAll().toList()

    fun addMessage(message: Message): Message = repository.save(message)

    fun removeAllMessages() = repository.deleteAll()
}
