import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function TaskCard({ task, refresh }: any) {
  const toggle = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    toast.success("Task updated");
    refresh();
  };

  const remove = async () => {
    await api.delete(`/tasks/${task.id}`);
    toast.success("Task deleted");
    refresh();
  };

  return (
    <div className="p-4 border rounded mb-3 flex justify-between">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.status}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={toggle} className="text-blue-600">
          Toggle
        </button>
        <button onClick={remove} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
