import { useEffect, useState, useCallback } from 'react';
import axios from '../../api/axios';
import ContactModal from './ContactModal';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function ContactInfoSection({ studentId }) {
  const [contact, setContact] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchContactInfo = useCallback(async () => {
    try {
      const res = await axios.get(`/students/${studentId}/contact-info`);
      setContact(res.data || {});
      setLoading(false);
    } catch (err) {
      console.error('연락처 정보 불러오기 실패:', err);
    }
  }, [studentId]);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="section-title text-sectionContact">📇 Contact Info</h2>
        <Button
          variant="ghostText"
          onClick={() => setShowModal(true)}
          className="text-sm text-sectionContact hover:underline"
        >
          Edit
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex gap-2">
          <span className="font-medium w-20">Email:</span>
          <span className={contact.email ? '' : 'text-gray-400'}>
            {contact.email || '-'}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-20">Phone:</span>
          <span className={contact.phone ? '' : 'text-gray-400'}>
            {contact.phone || '-'}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-20">Address:</span>
          <span className={contact.address ? '' : 'text-gray-400'}>
            {contact.address || '-'}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-20">School:</span>
          <span className={contact.school ? '' : 'text-gray-400'}>
            {contact.school || '-'}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-20">Grade:</span>
          <span className={contact.grade ? '' : 'text-gray-400'}>
            {contact.grade || '-'}
          </span>
        </div>
      </div>

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
