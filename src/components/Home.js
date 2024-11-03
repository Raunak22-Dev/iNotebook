import React, { useContext,useEffect } from "react";
import Notes from './Notes'
import Addnotes from './Addnotes'
import { NoteContext } from "../context/notes/notesContext";


const Home = () => {
  const context = useContext(NoteContext);
    const { getNotes } = context;
  useEffect(()=>{
    getNotes()
   // eslint-disable-next-line
  },[])
      return (
    <div >
<Addnotes />
   <Notes />
    </div>
  )
}

export default Home