import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function ConversationSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');

  const [loading, setLoading] = useState(true);

  // ✅ 초기 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/students/${studentId}/conversations`);
        setItems(res.data);
        setLoading(false);
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

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <h2 className="section-title text-sectionConversation">
        🗨️ Conversation
      </h2>

      {items.length === 0 ? (
        <div className="text-soft-sm">No Conversation with Student</div>
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
                <div className="text-soft-xs mb-1">
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
          className="w-full form-input"
          placeholder="Type a message..."
        />
        <Button
          variant="primary"
          onClick={addMessage}
          className="text-sm px-3 py-1"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
