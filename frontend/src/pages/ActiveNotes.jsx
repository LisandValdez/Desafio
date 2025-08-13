import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteItem from "../components/NoteItem";

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/notes/active").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const handleUpdate = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  return (
    <div>
      <h2>Notas Activas</h2>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default ActiveNotes;
