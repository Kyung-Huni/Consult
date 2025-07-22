import TaskRowItem from '../../components/ui/TaskRowItem';

export default function ToDoCard({ todos }) {
  return (
    <div className="section-box">
      <div className="section-title">📌 Student ToDo</div>
      {todos.length === 0 ? (
        <p className="text-sm text-text-soft">No Student ToDo</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((item) => (
            <TaskRowItem
              key={item.id}
              title={item.text}
              date={new Date(item.due).toLocaleDateString()}
              name={item.student.name}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
