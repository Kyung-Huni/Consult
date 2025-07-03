import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function ConversationSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');

  // ✅ 초기 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/students/${studentId}/conversations`);
        setItems(res.data);
      } catch (err) {
        console.error('대화 불러오기 실패:', err);
      }
    };
    fetchMessages();
  }, [studentId]);

  // ✅ 메시지 추가
  const addMessage = async () => {
    if (!newText.trim()) return;

    try {
      const res = await axios.post(`/students/${studentId}/conversations`, {
        sender: 'You',
        text: newText,
      });

      setItems((prev) => [...prev, res.data]);
      setNewText('');
    } catch (err) {
      console.error('메시지 전송 실패:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <h2 className="text-lg font-bold mb-2">🗨️ Conversation</h2>
      {items.length === 0 ? (
        <div>No Conversation with Student</div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                item.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  item.sender === 'You'
                    ? 'bg-indigo-100 text-right'
                    : 'bg-gray-100'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {item.sender} ·{' '}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="text-gray-800">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-2 border-t">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addMessage()}
          className="w-full border rounded px-3 py-1 text-sm"
          placeholder="Type a message..."
        />
        <button
          onClick={addMessage}
          className="text-sm bg-button hover:bg-button-hover text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
