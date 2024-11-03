import React, { useContext } from "react";
import { NoteContext } from "../context/notes/notesContext";

const Notesitems = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote  } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
          <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Notesitems;