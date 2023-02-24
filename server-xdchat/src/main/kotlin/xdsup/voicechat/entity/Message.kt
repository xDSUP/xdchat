package xdsup.voicechat.entity

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(indexes = [Index(name = "roomId_index", columnList = "roomId")])
data class Message(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        @JsonProperty("id")
        val id: Long = 0,
        @JsonProperty("userName")
        val userName: String = "",
        @JsonProperty("text")
        val text: String = "",
        @JsonProperty("date") @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss.SSS")
        var date: LocalDateTime? = LocalDateTime.now(),
        @JsonProperty("room")
        @ManyToOne
        @JoinColumn(name = "roomId")
        val room: Room? = null,
) {
    init {
        this.date = LocalDateTime.now()
    }
}
