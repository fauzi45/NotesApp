import React from "react";
import NotesItem from "./NotesItem";

function NotesList ({ listNotes, onDelete, onArchive}) {
    return(
        <>
            { listNotes.length !== 0 ?
                <div className="notes-list">
                {
                    listNotes.map(item => (
                        <NotesItem key={item.id} note={item} onDelete={onDelete} onArchive={onArchive} />
                    ))
                }
                </div> :
                <p className="notes-list__empty-message">No notes here.</p>
            }
        </>
    )
}

export default NotesList;