"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/tasks?search=${search}&status=${status}&page=1&limit=10`
      );
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Task Dashboard 📋
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage and track your tasks efficiently
          </p>
        </div>

        {/* Task Form */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40">
          <TaskForm refresh={fetchTasks} />
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/40 flex flex-col md:flex-row gap-4">
          
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-md border border-white/40">
              <p className="text-gray-500 text-lg">
                No tasks found 💤
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting filters or create a new task.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4"
              >
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
