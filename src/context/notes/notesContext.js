import React ,{ createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = (props) => {
  const host = "http://localhost:3002/";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyNGQ4NWVkZjU5YmU2YjA0NTZhYWFlIn0sImlhdCI6MTczMDQ2ODAwMX0.lpnzRbqThyCReBy08jYt7kGF4G5EtRKTIh19gA7S5KU'
        }
      });

      const data = await response.json();
      if (response.ok) {
        setNotes(data); // Update notes with fetched data
      } else {
        console.error('Error fetching notes:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyNGQ4NWVkZjU5YmU2YjA0NTZhYWFlIn0sImlhdCI6MTczMDQ2ODAwMX0.lpnzRbqThyCReBy08jYt7kGF4G5EtRKTIh19gA7S5KU'
        },
        body: JSON.stringify({ title, description, tag })
      });

      const newNote = await response.json();

      if (response.ok) {
        setNotes((prevNotes) => [...prevNotes, newNote]); // Add the new note to the lis
      } else {
        console.error('Error adding note:', newNote.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Edit a note
  const editNote = async (id, updatedTitle, updatedDescription, updatedTag) => {
    try {
      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyNGQ4NWVkZjU5YmU2YjA0NTZhYWFlIn0sImlhdCI6MTczMDQ2ODAwMX0.lpnzRbqThyCReBy08jYt7kGF4G5EtRKTIh19gA7S5KU'
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          tag: updatedTag
        })
      });

      const updatedNote = await response.json();

      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title: updatedTitle, description: updatedDescription, tag: updatedTag } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error('Error updating note:', updatedNote.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyNGQ4NWVkZjU5YmU2YjA0NTZhYWFlIn0sImlhdCI6MTczMDQ2ODAwMX0.lpnzRbqThyCReBy08jYt7kGF4G5EtRKTIh19gA7S5KU'
        }
      });

      const result = await response.json();

      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error('Error deleting note:', result.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteState };
