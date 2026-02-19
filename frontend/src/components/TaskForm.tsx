import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function TaskForm({ refresh }: any) {
  const [title, setTitle] = useState("");

  const createTask = async (e: any) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    toast.success("Task created");
    setTitle("");
    refresh();
  };

  return (
    <form onSubmit={createTask} className="flex gap-2">
      <input
        className="border p-2 flex-1"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
