import { useState } from 'react';

export default function ConversationSection({ conversation = [] }) {
  const [items, setItems] = useState(conversation);
  const [newText, setNewText] = useState('');

  const addMessage = () => {
    if (!newText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: newText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setItems((prev) => [...prev, newMessage]);
    setNewText('');
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
              className={`flex ${item.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  item.sender === 'You' ? 'bg-indigo-100 text-right' : 'bg-gray-100'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {item.sender} · {item.time}
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
