//servidor
//importando modulo express
import express from 'express'
import {Server as WebSocketServer} from 'socket.io'
import http from 'http'
import {v4 as uuid4} from 'uuid'

//este va a ser mi base de datos
const notes = []

//ejecutando express
const app = express()

//conexion con http
const server = http.createServer(app)

//conexion con socket io
const io = new WebSocketServer(server)

//aca le digo a la app que cuando este en la pag principal se conecte con la carp public
app.use(express.static(__dirname + '/public'))

//enviando evento
io.on('connection', (socket) => {
    console.log('nueva conexion:', socket.id )

    /* socket.emit('ping')

    //cuando el servidor escuche ele evento pong va a mandar el msj hola soy elpong
    socket.on('pong', () => {
        console.log('hola soy el pong') 
    })*/

        socket.on('client:newnote', (newNote) => {

            const note = {...newNote, id:uuid4()};
            console.log(note);
            notes.push(note);

            //ahora se emitira un server:newnote indicando que se guardo la nota
            socket.emit('server:newnote', note)
            //ahora me voy al cliente/main

        
        });
    
});

//escuchando al puerto 3000
server.listen(3000)

//mostrar msj por consola
console.log('Server on port', 3000)