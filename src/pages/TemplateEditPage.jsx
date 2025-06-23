import { useParams } from 'react-router-dom';

const dummyTemplates = [
  {
    id: 1,
    title: 'Essay Guide',
    description: 'How to write a personal statement',
  },
  {
    id: 2,
    title: 'Meeting Agenda',
    description: 'Standard session structure',
  },
];
export default function TemplateEditPage({ isNew }) {
  const { id } = useParams();
  const template = dummyTemplates.find((t) => t.id === parseInt(id));

  if (!isNew && !template) return <div>Template not found.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">
        {isNew ? '🆕 New Template' : `✏️ Edit Template: ${template.title}`}
      </h1>

      <input className="w-full border rounded px-3 py-1" defaultValue={template?.title || ''} />
      <textarea
        className="w-full border rounded px-3 py-2 h-60"
        defaultValue={template?.content || ''}
      />

      <button className="text-sm bg-indigo-600 text-white px-4 py-1 rounded">Save</button>
    </div>
  );
}
