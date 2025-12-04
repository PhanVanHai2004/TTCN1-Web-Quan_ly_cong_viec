export default function Column({ title, tasks, onSelect }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="bg-gray-100 rounded p-4 flex-1 min-w-[250px]">
      <h2 className="font-bold text-lg mb-4">{title}</h2>

      {safeTasks.length === 0 ? (
        <p className="text-gray-500">Không có công việc nào</p>
      ) : (
        safeTasks.map(task => (
          <div
            key={task.id}
            className="bg-white rounded shadow p-3 mb-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(task)}
          >
            <p className="font-medium">{task.name}</p>
            <p className="text-sm text-gray-500">
              Deadline: {task.deadline?.slice(0, 10)}
            </p>
            <p className="text-sm text-gray-400">Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
