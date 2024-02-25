import React, { useContext } from 'react'
import "./noteitem.css";
import noteContext from '../../context/notes/noteContext';

const Noteitem = (props) => {
    const context=useContext(noteContext);
  const { deleteNote } =context;

  const { note, updateNote } = props;
  return (
      <div className="note_container">
          <h5 className="note_title">{note.title}</h5>
          <p className="note_description">{note.description} </p>
          <div className="note_icons_container">
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
      </div>
  )
}

export default Noteitem
