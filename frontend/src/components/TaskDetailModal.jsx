export default function TaskDetailModal({ task, onClose }) {
  if (!task) return null;

  // Danh sách các field quan trọng muốn hiển thị
  const fields = [
    { label: "Mô tả", value: task.description },
    { label: "Status", value: task.status },
    { label: "Tiến độ", value: task.progress + "%" },
    { label: "Deadline", value: task.deadline?.slice(0, 10) },
    { label: "Ngày hoàn thành", value: task.done_day || "-" },
    { label: "Ngày tạo", value: task.created_at?.slice(0, 10) },
    { label: "Người tạo", value: task.owner?.username || "-" },
    { label: "Người được giao", value: task.assignee?.username || "-" },
    { label: "Người giám sát", value: task.reviewer?.username || "-" },
    { label: "File", value: task.file_name || "Chưa có" }
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-[400px] max-w-[90%] relative">
        <h2 className="text-2xl font-bold mb-4">{task.name}</h2>

        {fields.map(({ label, value }) => (
          <p key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ))}

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
