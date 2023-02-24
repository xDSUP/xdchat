package xdsup.voicechat.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.*

@Entity
data class Room(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: UUID? = UUID.randomUUID(),
) {
    init {
        this.id = UUID.randomUUID()
    }
}