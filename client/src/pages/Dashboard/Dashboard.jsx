import React, { useEffect, useState } from "react";
import CreateTodoModal from "../../components/Layout/CreateTodoModal";
import todoServices from "../../services/TodoService";
import TodoCard from "../../components/Card/TodoCard";
import Spinner from "../../components/Layout/Spinner";
import EditTodoModal from "../../components/Layout/EditTodoModal";
import { Plus, Search, ClipboardList } from "lucide-react";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  // search
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase()),
    );
    setSearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };

  // get user todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;
  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await todoServices.getAllTodo(id);
      setLoading(false);
      setAllTask(data?.todos || []);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Your Tasks</h1>
            <p className="text-sm text-zinc-500 mt-1">Manage and track your daily activities</p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors w-full sm:w-auto"
            onClick={openModalHandler}
          >
            <Plus className="w-4 h-4" /> Create Task
          </button>
        </div>

        <div className="relative mt-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
            placeholder="Search your task"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : allTask.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <ClipboardList className="h-10 w-10 text-zinc-600" />
            <h3 className="text-zinc-400 text-sm mt-3">No tasks found</h3>
            <p className="text-zinc-600 text-xs mt-1">Get started by creating your first task.</p>
          </div>
        ) : (
          <TodoCard allTask={allTask} getUserTask={getUserTask} onEdit={setEditingTask} />
        )}

        {/* ============Modal============ */}
        <CreateTodoModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
        {editingTask && (
          <EditTodoModal
            editingTask={editingTask}
            onClose={() => setEditingTask(null)}
            getUserTask={getUserTask}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
