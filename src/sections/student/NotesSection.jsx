import { useState } from 'react';

export default function NotesSection({ notes = [] }) {
  const [items, setItems] = useState(notes);
  const [newNote, setNewNote] = useState('');
  const [showInput, setShowInput] = useState(false);

  const addNote = () => {
    if (!newNote.trim()) return;

    const newItem = {
      id: Date.now(),
      content: newNote.trim(),
      date: new Date().toLocaleString(),
      author: 'You',
    };

    setItems((prev) => [...prev, newItem]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">📁 Notes / Files / Emails</h2>
        <button
          className="bg-button hover:bg-button-hover text-sm text-white border px-3 py-1 rounded"
          onClick={() => setShowInput((prev) => !prev)}
        >
          {showInput ? 'Cancel' : '+ Add Note'}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No Notes</div>
      ) : (
        <div className="space-y-3">
          {items.map((note) => (
            <div key={note.id} className="bg-yellow-100 p-3 rounded shadow-sm relative">
              <div className="text-xs text-gray-600 mb-1">Saved {note.date}</div>
              <div className="text-gray-800">{note.content}</div>
              <div className="text-xs text-gray-500 mt-1">Note by: {note.author}</div>
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute right-2 top-2 text-danger hover:text-danger-hover text-sm"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}

      {showInput && (
        <div className="pt-2 border-t space-y-2">
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            onClick={addNote}
            className="bg-button hover:bg-button-hover text-white px-3 py-1 rounded text-sm"
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
}
