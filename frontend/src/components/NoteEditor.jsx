import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export default function NoteEditor({ note, onSaved, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [archived, setArchived] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Note changed:', note);
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setArchived(note.archived || false);
    } else {
      setTitle('');
      setContent('');
      setArchived(false);
    }
  }, [note]);

  const saveNote = async () => {
    setLoading(true);
    try {
      if (note && note.id) {
        // Edit existing note
        await axios.put(`${API}/notes/${note.id}`, { title, content, archived });
      } else {
        // Create new note
        await axios.post(`${API}/notes`, { title, content });
        onSaved();
        setTitle('');
        setContent('');
        setArchived(false);
      }
      if (note && note.id) {
        onSaved();
      }
    } catch (err) {
      alert('Error saving the note');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleArchive = async () => {
    if (!note || !note.id) return;
    setLoading(true);
    try {
      const url = `${API}/notes/${note.id}/${archived ? 'unarchive' : 'archive'}`;
      await axios.post(url);
      setArchived(!archived);
      onSaved();
    } catch (err) {
      alert('Error changing archive status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
        style={{ width: '100%', height: 80, marginBottom: 8 }}
      />
      <div>
        <button onClick={saveNote} disabled={loading || !title.trim()}>
          {note ? 'Save Changes' : 'Create Note'}
        </button>
        {note && (
          <button onClick={toggleArchive} disabled={loading} style={{ marginLeft: 10 }}>
            {archived ? 'Unarchive' : 'Archive'}
          </button>
        )}
        {note && (
          <button onClick={onCancel} disabled={loading} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
