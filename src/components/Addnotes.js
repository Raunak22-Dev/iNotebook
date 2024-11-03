import React, { useState, useContext } from "react";
import { NoteContext } from "../context/notes/notesContext";
import '../Style/addnotes.css'; // if Style folder is in src


const Addnotes = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  
  const [notes, setNotes] = useState({ title: "", description: "", tag: "" });          
  
  const handleAdd = async (e) => {
    e.preventDefault();
    await addNote(notes.title, notes.description, notes.tag);
    
    // Reset the fields after adding the note
    setNotes({ title: "", description: "", tag: "" });
  };
  
  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container my-3">
      <h2>Create New Note</h2>
      <form className="my-3" onSubmit={handleAdd}>
        <div className="mb-3">
          <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={notes.title}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={notes.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={notes.tag}
            onChange={handleChange}
          />
        </div>
        
        <button 
          disabled={notes.title.length < 5 || notes.description.length < 5} // Check string lengths directly
          type="submit" 
          className="btn btn-success"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnotes;
