import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  async function load() {
    const res = await axios.get(`${API}/notes?archived=${showArchived}`);
    setNotes(res.data);
  }

  useEffect(() => {
    load();
  }, [showArchived]); // reload when tab changes

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>

      {/* Buttons to toggle between active and archived */}
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setShowArchived(false)}
          disabled={!showArchived}
          style={{ marginRight: 10 }}
        >
          Active notes
        </button>
        <button
          onClick={() => setShowArchived(true)}
          disabled={showArchived}
        >
          Archived notes
        </button>
      </div>

      <NoteEditor
        note={editing}
        onSaved={() => {
          load();
          setEditing(null);
        }}
        onCancel={() => setEditing(null)}
      />

      <div style={{ marginTop: 20 }}>
        {notes.length === 0 ? (
          <p>
            No {showArchived ? 'archived' : 'active'} notes
          </p>
        ) : (
          notes.map((n) => (
            <NoteCard
              key={n.id}
              note={n}
              onChange={load}
              onEdit={() => setEditing(n)}
            />
          ))
        )}
      </div>
    </div>
  );
}
