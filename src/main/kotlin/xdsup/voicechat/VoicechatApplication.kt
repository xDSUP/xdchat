package xdsup.voicechat

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.servlet.config.annotation.EnableWebMvc

@EnableWebMvc
@SpringBootApplication
class VoicechatApplication

fun main(args: Array<String>) {
    runApplication<VoicechatApplication>(*args)
}
