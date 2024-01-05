//cliente
//guardo a io dentro de una funcion u objeto socket para escucharlo
const socket = io()

//cuando socket escuche(on) a ping, va a ejecutar el evento pong
/* socket.on('ping', () => {
    socket.emit('pong')
}) */

//vamos a crear una variable noteForm que va a elegir al #noteForm 

const noteForm = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const notes = document.querySelector('#notes')


noteForm.addEventListener('submit', e => {

    e.preventDefault()


    //aca capturo los datos y los muestro por console.log
    /* console.log(
        title.value,
        description.value
    ) */

    socket.emit('client:newnote', {
        title: title.value,
        description: description.value 
    })

    socket.on('server:newnote', data => {
        notes.innerHTML += 'new note'
    })

})