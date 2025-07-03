import { useParams } from 'react-router-dom';
import ChecklistTemplateEditor from '../sections/template/ChecklistTemplateEditor';
import MeetingTemplateEditor from '../sections/template/MeetingTemplateEditor';

export default function TemplateEditor() {
  const { type, id } = useParams();

  if (type === 'Checklist') {
    return <ChecklistTemplateEditor id={id} />;
  } else if (type === 'Meeting') {
    return <MeetingTemplateEditor id={id} />;
  } else {
    return <div>잘못된 템플릿 타입입니다.</div>;
  }
}
