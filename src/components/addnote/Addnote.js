import React, { useState, useContext } from "react";
import "./addnote.css";
import noteContext from "../../context/notes/noteContext";
import { toast } from "react-toastify";

const Addnote = (props) => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const { title, description } = note;

  const context = useContext(noteContext);
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please Filled Out Fields");
      // console.log("Please Filled Out Fields")
    } else {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      // console.log("Note Added Successfully", note);
      toast.success("Note Added successfully");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <form className="addnote_form_container">
      <div className="addnote_label_container">
        <label htmlFor="title" className="addnote_label">
          Title {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
          type="text"
          className="addnote_input"
          id="title"
          name="title"
          value={note.title}
          onChange={onChange}
          required
        />
      </div>
      <div className="addnote_label_container">
        <label htmlFor="description" className="addnote_label">
          Description {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
          type="text"
          className="addnote_input"
          id="description"
          name="description"
          value={note.description}
          onChange={onChange}
          required
        />
      </div>

      <div className="addnote_label_container">
        <label htmlFor="tag" className="addnote_label">
          Tag
        </label>
        <input
          type="text"
          className="addnote_input"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
        />
      </div>

      <button type="submit" onClick={handleClick} className="addnote_button">
        Add Note
      </button>
    </form>
  );
};

export default Addnote;
