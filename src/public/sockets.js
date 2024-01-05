const saveNote = (title, description) =>{
    socket.emit('client:newnote', {
        title,
        description 
    })

    //esto va a escuchar cuando una nueva nota sea añadida 
    socket.on('server:newnote', data => {
        notes.innerHTML += 'new note'
    })
}