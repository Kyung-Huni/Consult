// components/ui/TaskRowItem.jsx
export default function TaskRowItem({ title, date, name }) {
  return (
    <li className="list-box-item flex justify-between items-center gap-4 text-sm">
      <div className="truncate font-medium">{title}</div>
      <div className="flex gap-4 text-soft-xs whitespace-nowrap">
        <div>DueDate: {date}</div>
        <div>Name: {name}</div>
      </div>
    </li>
  );
}
