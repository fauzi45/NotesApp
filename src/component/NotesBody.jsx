import React from "react";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";
function NotesBody({notes,addNew, onDelete, onArchive}){
    return(
        <div className="note-app__body">
            <NotesForm addNew={addNew}/>
            <h2>Catatan Aktif</h2>
            <NotesList listNotes={notes.filter(note => note.archived === false)} onDelete={onDelete} onArchive={onArchive} />
            <h2>Catatan Arsip</h2>
            <NotesList listNotes={notes.filter(note => note.archived === true)} onDelete={onDelete} onArchive={onArchive} />
        
        </div>
    )
}

export default NotesBody;