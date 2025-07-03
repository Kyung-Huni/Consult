import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import templateData from '../data/templates';

const tabNames = ['Checklist', 'Meeting', 'Note', 'College'];

export default function Templates() {
  const [allTemplates, setAllTemplates] = useState(templateData);
  const [activeTab, setActiveTab] = useState('Checklist');
  const navigate = useNavigate();

  const currentTemplates = allTemplates[activeTab] || [];

  const deleteTemplate = (id) => {
    setAllTemplates((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((tpl) => tpl.id !== id),
    }));
  };
  const handleEdit = (template) => {
    navigate(`/templates/edit/Checklist/${template.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Templates</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
          + New Template
        </button>
      </div>

      <div className="text-sm space-y-6">
        <div className="flex space-x-4 border-b pb-2">
          {tabNames.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm pb-1 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search templates..."
        className="border rounded px-3 py-1 text-sm w-full"
      />

      <div className="space-y-4">
        {currentTemplates.map((tpl) => (
          <div key={tpl.id} className="bg-white shadow rounded p-4 border border-gray-200 text-sm">
            <div className="font-semibold text-base">{tpl.title}</div>
            <div className="text-gray-500 mb-2">{tpl.description}</div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Last used: {tpl.lastUsed}</span>
              <div className="flex gap-2">
                <button className="hover:underline" onClick={() => handleEdit(tpl)}>
                  Edit
                </button>
                <button className="hover:underline">Duplicate</button>
                <button
                  className="hover:underline text-red-500"
                  onClick={() => deleteTemplate(tpl.id)}
                >
                  Delete
                </button>
                <button className="hover:underline text-blue-500">Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
