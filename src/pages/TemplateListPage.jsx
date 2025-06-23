import { useNavigate } from 'react-router-dom';

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

export default function TemplateListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">📋 My Templates</h1>

      <button
        className="text-sm bg-indigo-600 text-white px-4 py-1 rounded"
        onClick={() => navigate('/templates/new')}
      >
        + New Template
      </button>

      <div className="grid grid-cols-2 gap-3">
        {dummyTemplates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => navigate(`/templates/${tpl.id}`)}
            className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
          >
            <div className="font-semibold">{tpl.title}</div>
            <div className="text-xs text-gray-500">{tpl.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
