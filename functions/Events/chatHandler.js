import { Server, Socket } from "socket.io";

export function newMessage(io) {
    /** @type {Object<string, Server>} */
    const { client, server } = io;

    client.on("Event::NewMessage", (data) => {
        const { room, message } = data;
        if (!room || !message) return;

        server.to(room).emit("Event::NewMessage", { message });
    });
}

export function registerRoom(io) {
    /** @type {Object<string, Socket>} */
    const { client } = io;

    client.on("Event::RegisterRoom", (data) => {
        const { room } = data;
        if (!room) return;

        client.leaveAll();
        client.join(room);
    });
}
