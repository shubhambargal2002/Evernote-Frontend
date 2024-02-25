import React, { useState, useEffect, useContext } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext";
import Addnote from "../addnote/Addnote";
import Noteitem from "../noteitem/Noteitem";
import Navbar from "../navbar/Navbar";
import ReactModal from "react-modal";
import { toast } from "react-toastify";

const Dashboard = () => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(notes);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Update search results whenever search term changes
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredNotes);
  }, [notes, searchTerm]);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    setIsModalOpen(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setIsModalOpen(false);
    // console.log('Note updated Successfully', note);
    toast.success("Note updated Successfully");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />

      <div className="dashboard_container">
        <div className="dashboard">
          <Addnote />

          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Edit Note"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
              content: {
                margin: "auto",
                backgroundColor: "#fff",
                border: "2px solid #8758ff",
                padding: "30px",
                boxSizing: "border-box",
                width: "320px",
                height: "500px",
              },
            }}
          >
            <form className="edit_form">
              <div className="label_container">
                <label htmlFor="title" className="addnote_label">
                  Title
                </label>
                <input
                  type="text"
                  className="addnote_input"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>
              <div className="label_container">
                <label htmlFor="description" className="addnote_label">
                  Description
                </label>
                <input
                  type="text"
                  className="addnote_input"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                />
              </div>

              <div className="label_container">
                <label htmlFor="tag" className="addnote_label">
                  Tag
                </label>
                <input
                  type="text"
                  className="addnote_input"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
              <button
                type="button"
                className="addnote_button"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="addnote_button"
                onClick={handleClick}
              >
                Save Changes
              </button>
            </form>
          </ReactModal>

          <div className="whole_notes_container">
            <div className="input_container">
              <h2>Your Notes</h2>
              <input
                type="text"
                className="search_input"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="notes_container">
              {notes.length === 0 && searchTerm === "" ? (
                <p>Till you don't add any note.</p>
              ) : searchResults.length === 0 && searchTerm !== "" ? (
                <p>No matching notes found.</p>
              ) : (
                searchResults.map((note) => (
                  <Noteitem
                    key={note._id}
                    updateNote={updateNote}
                    note={note}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
