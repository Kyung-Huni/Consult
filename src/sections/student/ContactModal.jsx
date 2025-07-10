import { useState } from 'react';
import axios from 'axios';

export default function ContactModal({
  initialData,
  studentId,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `/contact-info/${studentId}`;
      const method =
        initialData && Object.values(initialData).some((v) => v)
          ? 'put'
          : 'post';
      await axios[method](url, form);
      onSave(); // 부모에게 알림
      onClose(); // 모달 닫기
    } catch (err) {
      alert('저장 실패');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
        <h3 className="text-lg font-bold">Edit Contact Info</h3>
        {['email', 'phone', 'address', 'school', 'grade'].map((field) => (
          <div key={field}>
            <label className="text-xs">{field}</label>
            <input
              className="w-full border p-2 rounded mt-1 text-sm"
              type="text"
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-sm text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-sm bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
