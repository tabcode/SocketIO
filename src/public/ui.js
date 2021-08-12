const notesList = document.querySelector('#notes');
function noteUI(note) {
    const div = document.createElement('div');

    div.innerHTML += `
        <div class="card card-body rounded-0 mb-2">
            <div class="d-flex justify-content-between">
                <h1 class="h3 card-title">${note?.title}</h1>
                <div>
                    <button class="btn btn-danger btn-sm delete" data-id="${note?.id}">delete</button>
                    <button class="btn btn-secondary btn-sm edit" data-id="${note?.id}" data-title="${note?.title}" data-description="${note?.description}">edit</button>
                </div>
            </div>
            <p>${note?.description}</p>
        </div>
    `;

    const btnDelete = div.querySelector('.delete');
    btnDelete.addEventListener('click', deleteNote);

    const btnUpdate = div.querySelector('.edit');
    btnUpdate.addEventListener('click', updateNote);

    return div
}

function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(element => {
        notesList.append(noteUI(element))
    });
}

function appendNote(note) {
    notesList.append(noteUI(note))
}

