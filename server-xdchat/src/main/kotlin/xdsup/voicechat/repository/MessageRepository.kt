package xdsup.voicechat.repository

import org.springframework.data.repository.CrudRepository
import xdsup.voicechat.entity.Message

interface MessageRepository : CrudRepository<Message, Long>