import React, { useEffect, useState } from "react";
import todoServices from "../../services/TodoService";
import Spinner from "../../components/Layout/Spinner";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";
import EditTodoModal from "../../components/Layout/EditTodoModal";
import TodoCard from "../../components/Card/TodoCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const Todos = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [filterTask, setFilterTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  useEffect(() => {
    if (!todoStatus || todoStatus === "select status") {
      setFilterTask(allTask || []);
    } else {
      const statusToCompare = todoStatus.toLowerCase();
      const filtered = allTask?.filter((item) => {
        if (statusToCompare === "complete" || statusToCompare === "completed") {
          return item?.isCompleted === true;
        }
        if (statusToCompare === "incomplete") {
          return item?.isCompleted === false;
        }
        return true;
      });
      setFilterTask(filtered || []);
    }
  }, [allTask, todoStatus]);

  const displayedTasks = todoStatus ? filterTask : allTask;

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Filtered Tasks</h1>
            <p className="text-sm text-zinc-500 mt-1">Filter tasks by completion status</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-wider">Status:</span>
            <Select
              defaultValue="select status"
              onValueChange={(val) => {
                setTodoStatus(val);
              }}
            >
              <SelectTrigger className="w-[180px] bg-[#111111] border border-[#1f1f1f] text-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border border-[#1f1f1f] text-white">
                <SelectItem value="select status" className="focus:bg-[#1f1f1f] focus:text-white">All Tasks</SelectItem>
                <SelectItem value="incomplete" className="focus:bg-[#1f1f1f] focus:text-white">Incomplete</SelectItem>
                <SelectItem value="completed" className="focus:bg-[#1f1f1f] focus:text-white">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : displayedTasks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <h3 className="text-zinc-500 text-sm">No tasks match this filter</h3>
          </div>
        ) : (
          <TodoCard allTask={displayedTasks} getUserTask={getUserTask} onEdit={setEditingTask} />
        )}
      </div>

      {editingTask && (
        <EditTodoModal
          editingTask={editingTask}
          onClose={() => setEditingTask(null)}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Todos;
