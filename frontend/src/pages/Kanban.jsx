import { useEffect, useState } from "react";

export default function Kanban() {
  const [tasks, setTasks] = useState([]);
  const API_BASE = "http://localhost:3000";
  // Các cột Kanban
  const columns = ["new", "working", "pending", "closed", "done"];

  // Fake dữ liệu hoặc fetch từ API
  useEffect(() => {
    fetch(`${API_BASE}/kanban `)
      .then(res => res.json())
      .then(data => {
        console.log("API data:", data);
        console.log("data item", data.done)
        console.log("data item", typeof (data))
        setTodayTasks(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log(err));
    const fakeData = [
      { id: 1, name: "Task 1", status: "new" },
      { id: 2, name: "Task 2", status: "working" },
      { id: 3, name: "Task 3", status: "pending" },
      { id: 4, name: "Task 4", status: "closed" },
      { id: 5, name: "Task 5", status: "done" },
      { id: 6, name: "Task 6", status: "new" },
    ];
    setTasks(fakeData);
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <div key={col} className="bg-gray-100 rounded p-4 flex-1 min-w-[200px]">
            <h2 className="font-bold text-lg mb-4 capitalize">{col}</h2>
            {tasks.filter(task => task.status === col).length === 0 ? (
              <p className="text-gray-500">Không có công việc nào</p>
            ) : (
              tasks
                .filter(task => task.status === col)
                .map(task => (
                  <div key={task.id} className="bg-white rounded shadow p-3 mb-3 hover:bg-gray-50">
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-gray-400">Status: {task.status}</p>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
