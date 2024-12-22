import React, { useState, useContext } from "react";
import { NoteContext } from "../context/notes/notesContext";
import Notification from "./Notification"; // Import Notification component
import "../Style/addnotes.css"; // if Style folder is in src

const Addnotes = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [notes, setNotes] = useState({ title: "", description: "", tag: "" });

  // State to store the notification message and type (for success or error)
  const [notification, setNotification] = useState({ message: "", type: "",trigger: 0 });

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
      setNotification({ message: "Failed to add note.", type: "error",trigger: Date.now() });
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
        setNotification({ message: "", type: "",trigger: Date.now() });
      }, 3000); // reset notification after 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [notification]);

  return (
    <>
      {/* Show Notification if there is any message */}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} trigger={notification.trigger} />
      )}

      <div className="container my-5">
  <div className="shadow p-4 rounded bg-light">
    <h2 
      className="text-center text-primary mb-4" 
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      Create New Note
    </h2>
    <form onSubmit={handleAdd}>
      {/* Title Field */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold text-dark fs-5">
          Title
        </label>
        <input
          type="text"
          className="form-control border border-primary"
          id="title"
          name="title"
          placeholder="Enter note title (min 5 characters)"
          value={notes.title}
          onChange={handleChange}
          required // Ensures it's a required field
        />
      </div>

      {/* Description Field */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold text-dark fs-5">
          Description
        </label>
        <textarea
          className="form-control border border-primary"
          id="description"
          name="description"
          rows="4"
          placeholder="Enter detailed note description (min 10 characters)"
          value={notes.description}
          onChange={handleChange}
          required // Ensures it's a required field
        ></textarea>
      </div>

      {/* Tag Field */}
      <div className="mb-3">
        <label htmlFor="tag" className="form-label fw-bold text-dark fs-5">
          Tag
        </label>
        <input
          type="text"
          className="form-control border border-secondary"
          id="tag"
          name="tag"
          placeholder="Enter a tag for the note (optional)"
          value={notes.tag}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary px-4 py-2 fs-5 fw-bold"
          style={{ borderRadius: '20px' }}
          disabled={notes.title.length < 5 || notes.description.length < 5} // Disables button when title/description are too short
        >
          Add Note
        </button>
      </div>
    </form>
  </div>
</div>


    </>
  );
};

export default Addnotes;
