import { useParams } from 'react-router-dom';
import ChecklistTemplateEditor from '../sections/template/ChecklistTemplateEditor';
import MeetingTemplateEditor from '../sections/template/MeetingTemplateEditor';
import NoteTemplateEditor from '../sections/template/NoteTemplateEditor';
import EmailTemplateEditor from '../sections/template/EmailTemplateEditor';
import CollegeTemplateEditor from '../sections/template/CollegeTemplateEditor';

export default function TemplateEditor() {
  const { type, id } = useParams();

  const props = id ? { id } : { isNew: true, type }; // 생성 vs 수정 구분

  if (type === 'Checklist') return <ChecklistTemplateEditor {...props} />;
  if (type === 'Meeting') return <MeetingTemplateEditor {...props} />;
  if (type === 'Note') return <NoteTemplateEditor {...props} />;
  if (type === 'Email') return <EmailTemplateEditor {...props} />;
  if (type === 'College') return <CollegeTemplateEditor {...props} />;

  return <div>잘못된 템플릿 타입입니다.</div>;
}
