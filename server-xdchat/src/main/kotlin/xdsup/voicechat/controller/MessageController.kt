package xdsup.voicechat.controller

import org.springframework.web.bind.annotation.*
import xdsup.voicechat.entity.Message
import xdsup.voicechat.service.MessageService

@RestController
@RequestMapping("/message")
class MessageController (
    private var service: MessageService
){
    @GetMapping
    fun getMessages(): List<Message> = service.getAllMessages()

    @PostMapping
    fun postMessage(@RequestBody message: Message) = service.addMessage(message)

    @DeleteMapping
    fun removeAllMessages() = service.removeAllMessages()
}
