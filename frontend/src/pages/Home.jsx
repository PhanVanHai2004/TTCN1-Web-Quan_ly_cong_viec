import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [deadline, setTodayTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [ReviewTasks, setWatchingTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Task đang được click


  const API_BASE = "http://localhost:3000";
  const fakeCurrentUser = { id: 7, name: "Hai Phan" }; // user giả

  useEffect(() => {
    fetch(`${API_BASE}/todos/search?deadline`)
      .then(res => res.json())
      .then(data => {
        console.log("API data:", data);
        setTodayTasks(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log(err));

    fetch(`${API_BASE}/todos/congviec/${fakeCurrentUser.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("API data:", data);

        setCreatedTasks(Array.isArray(data.owner) ? data.owner : []);
        console.log('owner', data.owner);

        setWatchingTasks(Array.isArray(data.review) ? data.review : []);
        console.log('assignee', data.review);
      })

      .catch(err => console.log(err));

    /* fetch(`${API_BASE}/todos/search?reviewer_id=${fakeCurrentUser.id}`)
      .then(res => res.json())
      .then(data => setWatchingTasks(data))
      .catch(err => console.log(err)); */
  }, []);
  const Column = ({ title, tasks }) => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    return (
      <div className="bg-gray-100 rounded p-4 flex-1 min-w-[250px]">
        <h2 className="font-bold text-lg mb-4">{title}</h2>
        {safeTasks.length === 0 ? (
          <p className="text-gray-500">Không có công việc nào</p>
        ) : (
          safeTasks.map(task => (
            <div key={task.id} className="bg-white rounded shadow p-3 mb-3 hover:bg-gray-100 "
              onClick={() => setSelectedTask(task)} /* mở popup */>
              <p className="font-medium">{task.name}</p>
              <p className="text-sm text-gray-500">Deadline: {task.deadline?.slice(0, 10)}</p>
              <p className="text-sm text-gray-400">Status: {task.status}</p>
            </div>
          ))
        )}
      </div>
    );
  };



  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="mb-6 flex gap-4">

        <Link to="/about" className="text-blue-500 hover:underline">Timeline</Link>
        <Link to="/contact" className="text-blue-500 hover:underline">Kanban</Link>
      </nav>

      <h1 className="text-2xl font-bold mb-6">Dashboard Công việc</h1>
      <div className="flex gap-4 flex-wrap">
        <Column title="Deadline hôm nay" tasks={deadline} />
        <Column title="Đã tạo" tasks={createdTasks} /> 
        <Column title="Giám sát" tasks={ReviewTasks} />
      </div>
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-[400px] max-w-[90%] relative">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.name}</h2>
            <p><strong>ID:</strong> {selectedTask.id}</p>
            <p><strong>Name:</strong> {selectedTask.name}</p>
            <p><strong>Tiến độ:</strong> {selectedTask.progress}</p>
            <p><strong>Ngày tạo:</strong> {selectedTask.created_at}</p>
            <p><strong>Deadline:</strong> {selectedTask.deadline?.slice(0, 10)}</p>
            <p><strong>Ngày hoàn thành:</strong> {selectedTask.done_day}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Mô tả:</strong> {selectedTask.description || "Chưa có mô tả"}</p>
            <p><strong>Người tạo:</strong> {selectedTask.owner.username || "Chưa có"}</p>
            <p><strong>Người được giao:</strong> {selectedTask.assignee.username || "Chưa có"}</p>
            <p><strong>Người giám sát:</strong> {selectedTask.reviewer.username|| "Chưa có"}</p>
            <p><strong>file :</strong> {selectedTask.file_name || "Chưa có"}</p>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedTask(null)} // đóng popup
            >
              Đóng
            </button>
          </div>
        </div>
      )}


    </div>

  );
}
