import React, { useContext } from "react";
import { NoteContext } from "../context/notes/notesContext";
import Swal from "sweetalert2";

const Notesitems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(note._id);
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };
  

  return (
    <div className="col-md-3 mb-4">
  <div className="card border-light shadow rounded-3">
    <div className="card-body">
      <h5 className="card-title fs-5 fw-bold text-primary">{note.title}</h5>
      <p className="card-text text-muted">{note.description}</p>
      <p className="card-text">
        <span className="badge bg-secondary">{note.tag}</span>
      </p>

      <div className="d-flex justify-content-start">
        <i
          className="fa-regular fa-pen-to-square mx-2 text-primary fs-5"
          onClick={() => updateNote(note)}
          style={{ cursor: 'pointer' }}
          title="Edit Note"
        ></i>
        <i
          className="fa-regular fa-trash-can mx-2 text-danger fs-5"
          onClick={handleDelete} // Trigger SweetAlert2 confirmation
          style={{ cursor: 'pointer' }}
          title="Delete Note"
        ></i>
      </div>
    </div>
  </div>
</div>

  );
};

export default Notesitems;
