import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
        await api.post("/logout");
    } catch (err) {
        console.error("Logout failed:", err);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
  };

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = async (taskData) => {
    try {
        const response = await api.post("/tasks", taskData);

        setTasks((prev) => [response.data, ...prev]);
        toast.success("Task created!");

        setShowTaskForm(false);
    } catch (err) {
        toast.error("Failed to create task.");
        console.error(err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
        const response = await api.put(`/tasks/${selectedTask.id}`, taskData);

        setTasks((prev) =>
        prev.map((task) =>
            task.id === selectedTask.id ? response.data : task
        )
        );

        setShowTaskForm(false);
        setSelectedTask(null);
        
        toast.success("Task updated!");
    } catch (err) {
        toast.error("Failed to update task.");
        console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}`);

            setTasks((prev) => prev.filter((task) => task.id !== taskId));
            toast.success("Task deleted!");
        } catch (err) {
            toast.error("Failed to delete task.");
            console.error(err);
        }
    };

  useEffect(() => {
    const fetchTasks = async () => {        
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        } finally {
            setLoading(false);
        }
    };        

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              TaskFlow QA
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back, {user?.name} 👋
            </p>
          </div>

          <button
            data-testid="logout-button"
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex justify-end">
            <button
            data-testid="create-task-btn"
            onClick={() => {
                setSelectedTask(null);
                setShowTaskForm(true);
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
            + New Task
            </button>
        </div>

        {loading ? (
            <LoadingSkeleton />
        ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                No tasks yet
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
                Create your first task to get started.
            </p>
            </div>
        ) : (
            <div className="grid gap-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                        setSelectedTask(task);
                        setShowTaskForm(true);
                    }}
                    onDelete={handleDeleteTask}
                />
            ))}
            </div>
        )}
        </main>

        {showTaskForm && (
            <TaskForm
                initialData={selectedTask}
                onClose={() => {
                setShowTaskForm(false);
                setSelectedTask(null);
                }}
                onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            />
        )}
        
    </div>
  );
}