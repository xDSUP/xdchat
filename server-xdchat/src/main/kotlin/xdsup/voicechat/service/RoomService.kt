package xdsup.voicechat.service

import org.springframework.stereotype.Service
import xdsup.voicechat.entity.Room
import xdsup.voicechat.repository.RoomRepository

@Service
class RoomService (
        private val repository: RoomRepository
) {
    fun getAllRooms(): List<Room> = repository.findAll().toList()

    fun addRoom(room: Room): Room = repository.save(room)

    fun removeAllRooms() = repository.deleteAll()
}