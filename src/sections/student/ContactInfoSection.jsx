import { useEffect, useState, useCallback } from 'react';
import axios from '../../api/axios';
import ContactModal from './ContactModal';

export default function ContactInfoSection({ studentId }) {
  const [contact, setContact] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchContactInfo = useCallback(async () => {
    try {
      const res = await axios.get(`/students/${studentId}/contact-info`);
      setContact(res.data || {});
    } catch (err) {
      console.error('연락처 정보 불러오기 실패:', err);
    }
  }, [studentId]);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">📇 Contact Info</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 text-xs underline"
        >
          Edit
        </button>
      </div>

      <p>
        <span className="font-medium">Email:</span> {contact.email || '-'}
      </p>
      <p>
        <span className="font-medium">Phone:</span> {contact.phone || '-'}
      </p>
      <p>
        <span className="font-medium">Address:</span> {contact.address || '-'}
      </p>
      <p>
        <span className="font-medium">School:</span> {contact.school || '-'}
      </p>
      <p>
        <span className="font-medium">Grade:</span> {contact.grade || '-'}
      </p>

      {showModal && (
        <ContactModal
          initialData={contact}
          studentId={studentId}
          onClose={() => setShowModal(false)}
          onSave={fetchContactInfo}
        />
      )}
    </div>
  );
}
