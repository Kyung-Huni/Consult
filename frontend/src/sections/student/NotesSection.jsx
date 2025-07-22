// NotesSection.jsx (템플릿 적용 추가)
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function NotesSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/templates?type=note').then((res) => setTemplates(res.data));
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/students/${studentId}/notes`);
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error('노트 불러오기 실패:', err);
      }
    };

    fetchNotes();
  }, [studentId]);

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(`/students/${studentId}/notes`, {
        content: newNote.trim(),
      });
      setItems((prev) => [res.data, ...prev]);
      setNewNote('');
      setShowInput(false);
    } catch (err) {
      console.error('노트 추가 실패:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/students/${studentId}/notes/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('노트 삭제 실패:', err);
    }
  };

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionNote">
          📁 Notes / Files / Emails
        </h2>
        <Button
          variant="ghostText"
          className="text-sm text-sectionNote hover:underline"
          onClick={() => setShowInput((prev) => !prev)}
        >
          {showInput ? 'Cancel' : '+ Add Note'}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-soft-sm">No Notes</div>
      ) : (
        <div className="space-y-3">
          {items.map((note) => (
            <div
              key={note.id}
              className="bg-yellow-100 p-3 rounded shadow-sm relative group"
            >
              <div className="text-xs text-gray-600 mb-1">
                Saved {new Date(note.createdAt).toLocaleString()}
              </div>
              <div className="text-gray-800 text-sm">{note.content}</div>
              <Button
                variant="dangerText"
                onClick={() => deleteNote(note.id)}
                className="text-sm px-2 py-1 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition"
              >
                delete
              </Button>
            </div>
          ))}
        </div>
      )}

      {showInput && (
        <div className="pt-2 border-t space-y-2">
          <div className="flex gap-2 items-center">
            <select
              value={selectedTemplate}
              onChange={(e) => {
                const tpl = templates.find((t) => t.id === e.target.value);
                if (tpl) {
                  setSelectedTemplate(tpl.id);
                  setNewNote(tpl.content);
                }
              }}
              className="form-input w-full"
            >
              <option value="">+ Select Template</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.title}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="form-input w-full p-2"
            rows={3}
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={addNote}
            className="shrink-0 px-3 py-1 text-sm"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
