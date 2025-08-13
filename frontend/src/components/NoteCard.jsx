import React from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export default function NoteCard({ note, onChange, onEdit }) {
  async function remove() {
    await axios.delete(`${API}/notes/${note.id}`);
    onChange();
  }

  async function archive() {
    await axios.post(`${API}/notes/${note.id}/archive`);
    onChange();
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={remove} style={{ marginLeft: 8 }}>Eliminar</button>
      {!note.archived && (
        <button onClick={archive} style={{ marginLeft: 8 }}>Archivar</button>
      )}
    </div>
  );
}
