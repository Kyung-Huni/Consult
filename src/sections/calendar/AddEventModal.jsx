import { useState } from 'react';

export default function AddEventModal({ date, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;

    const newMeeting = {
      id: Date.now(),
      title: title.trim(),
      date: date,
      time,
      note,
    };
    onAdd(newMeeting);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow">
        <div className="font-bold text-lg">📅 일정 추가: {date}</div>
        <input
          type="text"
          className="border w-full p-2 rounded text-sm"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="time"
          className="border w-full p-2 rounded text-sm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          rows={3}
          className="border w-full p-2 rounded text-sm"
          placeholder="내용"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button onClick={onClose} className="text-sm text-gray-500">
            취소
          </button>
          <button onClick={handleAdd} className="text-sm bg-blue-500 text-white px-4 py-1 rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
