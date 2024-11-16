import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../context/notes/notesContext";
import Notesitems from "./Notesitems";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes = [], getNotes, editNote } = context; // Provide a default value for notes
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await getNotes(); // Ensure it waits for the notes to load
      } else {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, getNotes]); // Add dependencies to trigger the effect correctly

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", Utitle: "", Udescription: "", Utag: "" });

  const updateNote = (currentNote) => {
    ref.current.click(); // Programmatically opens the modal
    setNote({
      id: currentNote._id,
      Utitle: currentNote.title,
      Udescription: currentNote.description,
      Utag: currentNote.tag
    });
  };

  const handleUpdate = async (e) => {
    await editNote(note.id, note.Utitle, note.Udescription, note.Utag);
    setNote({ id: "", Utitle: "", Udescription: "", Utag: "" }); // Reset fields
    refClose.current.click();
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none" // 'd-none' hides the button
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Open modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="Utitle" className="col-sm-3 col-form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Utitle"
                    name="Utitle"
                    value={note.Utitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Udescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Udescription"
                    name="Udescription"
                    value={note.Udescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Utag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Utag"
                    name="Utag"
                    value={note.Utag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                disabled={note.Utitle.length < 5 || note.Udescription.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes Are Added</h2>
        {notes.length === 0 && 'No Notes To Display'}
        {notes.map((note) => (
          <Notesitems key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
