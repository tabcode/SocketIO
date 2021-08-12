import express from 'express'
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);
let notes = [];

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    socket.emit('server:loadnotes', notes)

    socket.on('client:newnote', data => {
        data['id'] = uuid();
        notes.push(data);
        io.emit('server:newnote', data)
    })

    socket.on('client:deletenote', noteDeleted => {
        notes = notes.filter(note => note.id !== noteDeleted.id)
        io.emit('server:loadnotes', notes)
    })

    socket.on('client:updatenote', (note) => {
        notes = notes.map(lastnote => {
            if(lastnote.id === note.id){
                lastnote['title'] = note['title'];
                lastnote['description'] = note['description'];
            }
            return lastnote;
        })
        io.emit('server:loadnotes', notes)
    })
})

httpServer.listen(3000)