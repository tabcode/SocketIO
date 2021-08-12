const socket = io();
let noteId = null;
function saveNote(title, description) {
    if (noteId) {
        socket.emit('client:updatenote', { id: noteId, title, description })
    } else socket.emit('client:newnote', { title, description })
    noteId = null;
}

function deleteNote(event) {
    socket.emit('client:deletenote', { id: event.target.dataset.id })
}

function updateNote(event) {
    noteId = event.target.dataset.id;
    document.querySelector('#title').value = event.target.dataset.title;
    document.querySelector('#description').value = event.target.dataset.description;
}

socket.on('server:newnote', appendNote)

socket.on('server:loadnotes', renderNotes)