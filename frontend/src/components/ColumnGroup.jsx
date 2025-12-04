export default function ColumnGroup({ title, groups, onSelect }) {
    const safeGroup = Array.isArray(groups) ? groups : [];
    const rl = {
        member: "Thành viên",
        owner: "Người tạo",
        admin: "Trưởng nhóm"
    }
    function a() {
        return alert('xin chao')
    }
    return (
        <div className="bg-gray-100 rounded p-4 flex-1 min-w-[250px]">
            <h2 className="font-bold text-lg mb-4">{title}</h2>

            {safeGroup.length === 0 ? (
                <p className="text-gray-500">Bạn chưa tham gia nhóm nào</p>
            ) : (
                safeGroup.map((g, index) => (
                    <div
                        key={`${g.group_id}-${index}`}
                        className="bg-white rounded shadow p-3 mb-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => onSelect(g)}
                    >
                        <p className="text-sm">
                            <span className="font-medium text-gray-700">Tên nhóm: </span>
                            <span className="text-blue-500">{g.group_name}</span>
                        </p>

                        <p className="text-sm">
                            <span className="font-medium text-gray-700">Vai trò: </span>
                            <span className="text-green-500">{rl[g.user_role] || "-"}</span>
                        </p>
                         {/* Thành viên */}
                            <div className="text-sm mb-2">
                                <span className="font-medium text-gray-700">Thành viên: </span>

                                {g.members.slice(0, 3).map((m, i) => (
                                    <span key={i} className="text-green-500 mr-1">
                                        {m.user_id}
                                    </span>
                                ))}

                                {g.members.length > 3 && (
                                    <span className="text-gray-500">
                                        ... và {g.members.length - 3} người nữa
                                    </span>
                                )}
                            </div>
                        
                        <button onClick={a}>xem chi tiết</button>

                    </div>

                ))
            )}

        </div>
    );
}
