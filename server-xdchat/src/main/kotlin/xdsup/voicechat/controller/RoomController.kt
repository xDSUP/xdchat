package xdsup.voicechat.controller

import org.springframework.web.bind.annotation.*
import xdsup.voicechat.entity.Room
import xdsup.voicechat.service.RoomService

@RestController
@RequestMapping("/room")
class RoomController (
        private var service: RoomService
){
    @GetMapping
    fun getRooms(): List<Room> = service.getAllRooms()

    @PostMapping
    fun postRoom(@RequestBody room: Room) = service.addRoom(room)

    @DeleteMapping
    fun removeAllRooms() = service.removeAllRooms()
}