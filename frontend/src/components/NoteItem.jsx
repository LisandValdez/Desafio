import React from "react";

function NoteItem({ note, onArchiveToggle }) {
  const handleArchiveToggle = async () => {
    const endpoint = note.archived
      ? `/api/notes/${note._id}/unarchive`
      : `/api/notes/${note._id}/archive`;

    try {
      const res = await fetch(endpoint, { method: "PATCH" });
      if (!res.ok) throw new Error("Error changing note status");
      const updatedNote = await res.json();
      onArchiveToggle(updatedNote);
    } catch (error) {
      console.error(error);
      alert("Could not change note status");
    }
  };

  return (
    <div className={`note-item ${note.archived ? "archived" : ""}`}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleArchiveToggle}>
        {note.archived ? "Unarchive" : "Archive"}
      </button>
    </div>
  );
}

export default NoteItem;
