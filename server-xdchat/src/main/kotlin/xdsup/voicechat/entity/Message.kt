package xdsup.voicechat.entity

import com.fasterxml.jackson.annotation.JsonProperty

data class Message(
        @JsonProperty("userName")
        val userName: String,
        @JsonProperty("text")
        val text: String
)
