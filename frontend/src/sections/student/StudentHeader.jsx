export default function StudentHeader({ student }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <div className="text-xl font-bold">{student.name}</div>
        <div className="text-soft-sm">{student.school}</div>
      </div>
    </div>
  );
}
