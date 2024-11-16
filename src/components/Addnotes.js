import React, { useState, useContext } from "react";
import { NoteContext } from "../context/notes/notesContext";
import Notification from "./Notification"; // Import Notification component
import "../Style/addnotes.css"; // if Style folder is in src

const Addnotes = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [notes, setNotes] = useState({ title: "", description: "", tag: "" });

  // State to store the notification message and type (for success or error)
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Attempt to add the note
      await addNote(notes.title, notes.description, notes.tag);

      // Set success message and trigger the notification
      setNotification({ message: "Note added successfully!", type: "success" });

      // Reset the form fields after adding the note
      setNotes({ title: "", description: "", tag: "" });
    } catch (error) {
      // In case of error, show the error message in the notification
      setNotification({ message: "Failed to add note.", type: "error" });
      console.error("Error adding note:", error);
    }
  };

  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  // Reset the notification state after 3 seconds (same as toast auto close)
  React.useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000); // reset notification after 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [notification]);

  return (
    <div className="container my-3">
      {/* Show Notification if there is any message */}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <h2>Create New Note</h2>
      <form className="my-3" onSubmit={handleAdd}>
        <div className="mb-3">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Title
          </label>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
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
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
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
