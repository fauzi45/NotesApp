import React from "react";

function NotesHeader({onSearch}) {
    const onSearchBarHandler = (event) => {
        onSearch(event.target.value);
    }  
    return(
        <nav className="note-app__header">
            <h1>My Notes</h1>
            <div className="note-search">
                <input type="text" placeholder="Masukkan Judul Notes" onChange={onSearchBarHandler} />
            </div>
        </nav>
    )
}

export default NotesHeader;