package xdsup.voicechat.controller

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.*
import xdsup.voicechat.entity.Message
import xdsup.voicechat.service.MessageService


@RestController
@RequestMapping("/api/message")
class MessageController(
    private var service: MessageService,
    private var template: SimpMessagingTemplate,
) {
    private val log = LoggerFactory.getLogger(MessageController::class.java)

    @GetMapping
    fun getMessages(): List<Message> = service.getAllMessages()

    @PostMapping
    fun postMessage(@RequestBody message: Message): ResponseEntity<Message> {
        log.info("Received new message my post: $message")
        val result = service.addMessage(message)
        template.convertAndSend("/topic/message", message)
        return ResponseEntity<Message>(result, HttpStatus.OK)
    }

    @DeleteMapping
    fun removeAllMessages() = service.removeAllMessages()

    @MessageMapping("/sendMessage")
    @SendTo("/topic/message")
    fun receiveMessage(@Payload message: Message): Message {
        log.info("Received new message by ws: $message")
        service.addMessage(message)
        return message;
    }
}
