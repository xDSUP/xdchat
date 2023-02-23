package xdsup.voicechat.controller

import org.springframework.web.bind.annotation.*
import xdsup.voicechat.service.MessageService

@RestController
@RequestMapping("/message")
class MessageController (
    private var messageService: MessageService
){
    @GetMapping("/get")
    fun getMessages(): List<String> = messageService.getAllMessages()

    @PutMapping("/add")
    fun putMessage(@RequestBody message: String) = messageService.addMessage(message)

    @DeleteMapping("/clear")
    fun removeAllMessages() = messageService.removeAllMessages()
}
