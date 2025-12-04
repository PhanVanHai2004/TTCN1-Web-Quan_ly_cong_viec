import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import Taskcolumn from "../components/Taskcolumn";
import ColumnGroup from "../components/ColumnGroup";
import TaskDetailModal from "../components/TaskDetailModal";


export default function Home() {
  const [actGroup, setActGroup] = useState("members")
  const [action, setAction] = useState("working"); // filter hiện tại
  const [group, setGroup] = useState({
    owner:[],
    members:[]
  })
  const [tasksByAction, setTasksByAction] = useState({
    working: [],
    owner: [],
    done: [],
    deadline: []
  });
  const [deadline, setDeadline] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // task đang click
  const [selectedGroup, setSelectedGroup] = useState(null);

  const API_BASE = "http://localhost:3000";
  const fakeCurrentUser = { id: 5, name: "Hai Phan" };

  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch(`${API_BASE}/todos/congviec/${fakeCurrentUser.id}`)
      .then(res => res.json())
      .then(data => {
        setTasksByAction({
          working: Array.isArray(data.working) ? data.working : [],
          owner: Array.isArray(data.owner) ? data.owner : [],
          done: Array.isArray(data.done) ? data.done : [],
          deadline: Array.isArray(data.deadline) ? data.deadline : []
        });


        setReviewTasks(Array.isArray(data.review) ? data.review : []);
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`${API_BASE}/todos/deadline/${fakeCurrentUser.id}`)
      .then(res => res.json())
      .then(data => {
        setDeadline(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch(`${API_BASE}/group/getGroup/${fakeCurrentUser.id}`)
      .then(res => res.json())
      .then(data => {
        setGroup({
          owner: Array.isArray(data.owner) ? data.owner :[],
          members: Array.isArray(data.members) ? data.members :[]
        })
      })
      .catch(err => console.log(err))
  }, [])
console.log('group',group);

  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="mb-6 flex gap-4">
        <Link to="/about" className="text-blue-500 hover:underline">Timeline</Link>
        <Link to="/contact" className="text-blue-500 hover:underline">Kanban</Link>
      </nav>

      <h1 className="text-2xl font-bold mb-6">Dashboard Công việc</h1>

      <div className="flex gap-4 flex-wrap">

        {/* Deadline */}
        <Taskcolumn
          title="Deadline hôm nay"
          tasks={deadline}
          onSelect={setSelectedTask}
        />

        {/* Công việc của tôi + filter */}
        <div className="flex-1 min-w-[250px] bg-gray-50 rounded p-4">
          <div className="mb-3 font-bold">Công việc của tôi</div>

          <div className="flex gap-2 mb-4">
            {["working", "owner", "done", "deadline"].map(key => (
              <button
                key={key}
                onClick={() => setAction(key)}
                className={`px-3 py-1 rounded capitalize text-sm ${action === key ?
                  "bg-blue-500 text-white" :
                  "bg-gray-200"
                  }`}
              >
                {key}
              </button>
            ))}
          </div>

          <Taskcolumn
            title={action.charAt(0).toUpperCase() + action.slice(1)}
            tasks={tasksByAction[action]}
            onSelect={setSelectedTask}
          />
        </div>
        {/* Nhóm của tôi */}
        <div className="flex-1 min-w-[250px] bg-gray-50 rounded p-4">
          <div className="mb-3 font-bold">Nhóm của tôi</div>

          <div className="flex gap-2 mb-4">
            {["members", "owner"].map(key => (
              <button
                key={key}
                onClick={() => setActGroup(key)}
                className={`px-3 py-1 rounded capitalize text-sm ${actGroup === key ?
                  "bg-blue-500 text-white" :
                  "bg-gray-200"
                  }`}
              >
                {key}
              </button>
            ))}
          </div>
          {/* Nhóm của tôi */}
          <ColumnGroup
            title={actGroup.charAt(0).toUpperCase() + actGroup.slice(1)}
            groups={group[actGroup]}
            onSelect={setSelectedGroup}
          />
        </div>
      </div>

      {/* Popup chi tiết */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );

}
