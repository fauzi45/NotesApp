import React from "react";
import { Toast } from "./NotesAlert";
class NotesForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            title: '',
            body: '',
            BodyLength: 0,
        }

        this.onTitleEventChangeHandler = this.onTitleEventChangeHandler.bind(this);
        this.onBodyEventChangeHandler = this.onBodyEventChangeHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleEventChangeHandler(event){
        this.setState(() => {
            return {
                title: event.target.value,
            }
        });
    }

    onBodyEventChangeHandler(event){
        if (event.target.value.length <= 50) {
        this.setState(() => {
            return {
                body: event.target.value,
                BodyLength: event.target.value.length,
            }
        })
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Karakter tidak boleh melebihi 50'
              })
        }
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        if (this.state.title === '') {
            Toast.fire({
                icon: 'error',
                title: 'Title tidak boleh kosong'
              })
        }else if(this.state.body === ''){
            Toast.fire({
                icon: 'error',
                title: 'Deksripsi tidak boleh kosong'
              })
        } else{
                this.props.addNew(this.state);
                this.setState({
                    title: '',
                    body: ''
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Notes berhasil ditambahkan'
                  })
       }
    }

    render(){
        return(
            <>  
                <h2 className="note-app__bodyhead">Buat Notes Anda</h2>           
                <div className="note-input">
                    <div className="note-input__title__char-limit">Sisa Karakter : {50 - this.state.BodyLength}</div>
                    <form onSubmit={this.onSubmitEventHandler}>
                        <input 
                            className="note-input__title" 
                            type="text" 
                            name="title" 
                            placeholder="Judul Notes..."
                            value={this.state.title} 
                            onChange={this.onTitleEventChangeHandler}
                            />
                        <textarea 
                            className="note-input__body" 
                            name="desc"
                            placeholder="Deksripsi..."  
                            value={this.state.body}
                            onChange={this.onBodyEventChangeHandler}>
                        </textarea>
                        <button type="submit">Buat</button>
                    </form>
            </div>
            </>
        )
    }
}

export default NotesForm;