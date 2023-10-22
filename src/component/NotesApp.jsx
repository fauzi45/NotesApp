import React from "react";

import NotesHeader from "./NotesHeader";
import NotesBody from "./NotesBody";
import NotesFooter from "./NotesFooter";

import Swal from "sweetalert2";
import { Toast } from "./NotesAlert";
import { getInitialData } from '../utils/data';

class AppNotes extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            archiveNotes: getInitialData()
        }
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNewHandler = this.onAddNewHandler.bind(this);
    }

    onArchiveHandler(id){
        const noteToModify = this.state.archiveNotes.filter(note => note.id === id)[0];
        const modifiedNote = { ...noteToModify, archived: !noteToModify.archived };
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes.filter(note => note.id !== id),
                    modifiedNote
                ],
                archiveNotes: [
                    ...prevState.archiveNotes.filter(note => note.id !== id),
                    modifiedNote
                ],
            }
        });
        if (noteToModify.archived) {
            Toast.fire({
                icon: 'success',
                title: 'Notes Berhasil Diaktifkan'
              })
        } else {
            Toast.fire({
                icon: 'success',
                title: 'Notes berhasil Diarsipkan'
              })
        }
    }

    onSearchHandler(text) {
        if (text.length !== 0 && text.trim() !== '') {
            this.setState({
                notes: this.state.archiveNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase())),
            })
        } else {
            this.setState({
                notes: this.state.archiveNotes,
            })
        }
    }

    onDeleteHandler(id) {
        Swal.fire({
            title: 'Apakah Kamu Yakin?',
            text: "Kamu tidak bisa mengembalikannya kembali!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Iya, Hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
            this.setState((prevState) => {
                return {
                    notes: prevState.notes.filter(note => note.id !== id),
                    archiveNotes: prevState.archiveNotes.filter(note => note.id !== id),
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Notes berhasil Dihapus'
              })
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Notes Gagal Dihapus'
              })
        }            
    })
}

    onAddNewHandler({title, body}){
            this.setState((prevState) => {
                return {
                    notes: [
                        ...prevState.notes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            archived: false, 
                            createdAt: new Date(),
                        }
                    ],
                    archiveNotes: [
                        ...prevState.archiveNotes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            archived: false, 
                            createdAt: new Date(),
                        }
                    ]
                }
            })
        
    }

    render(){
        return(
            <div>
                <NotesHeader onSearch={this.onSearchHandler}/>
                <NotesBody notes={this.state.notes} addNew={this.onAddNewHandler} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />                
                <NotesFooter/>

            </div>
        )
    }
}

export default AppNotes;