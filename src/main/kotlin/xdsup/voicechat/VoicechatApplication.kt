package xdsup.voicechat

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class VoicechatApplication

fun main(args: Array<String>) {
    runApplication<VoicechatApplication>(*args)
}
