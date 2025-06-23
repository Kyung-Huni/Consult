export default function NotesSection({ notes = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">📁 Notes / Files / Emails</h2>
        <button className="text-xs text-gray-500 border px-2 py-1 rounded">+ Add Note</button>
      </div>

      {notes.length === 0 ? (
        <div className="text-sm text-gray-400">No Notes</div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-yellow-100 p-3 rounded shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Saved {note.date}</div>
              <div className="text-gray-800">{note.content}</div>
              <div className="text-xs text-gray-500 mt-1">Note by: {note.author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
