package xdsup.voicechat.controller

import org.springframework.web.bind.annotation.*
import xdsup.voicechat.entity.Message
import xdsup.voicechat.service.MessageService

@RestController
@RequestMapping("/message")
class MessageController (
    private var messageService: MessageService
){
    @GetMapping("/get")
    fun getMessages(): List<Message> = messageService.getAllMessages()

    @PutMapping("/add")
    fun putMessage(@RequestBody message: Message) = messageService.addMessage(message)

    @DeleteMapping("/clear")
    fun removeAllMessages() = messageService.removeAllMessages()
}
