import TaskRowItem from '../../components/ui/TaskRowItem';

export default function ChecklistCard({ checklist }) {
  return (
    <div className="section-box">
      <div className="section-title">✅ My Checklist</div>
      {checklist.length === 0 ? (
        <p className="text-sm text-text-soft">No Items</p>
      ) : (
        <ul className="space-y-2">
          {checklist.map((item) => (
            <TaskRowItem
              key={item.id}
              title={item.title}
              date={new Date(item.dueDate).toLocaleDateString()}
              name={item.student.name}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
