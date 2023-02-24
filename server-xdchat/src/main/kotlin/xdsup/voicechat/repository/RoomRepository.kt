package xdsup.voicechat.repository

import org.springframework.data.repository.CrudRepository
import xdsup.voicechat.entity.Room

interface RoomRepository : CrudRepository<Room, Long>