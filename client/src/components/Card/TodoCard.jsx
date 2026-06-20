import React from "react";
import todoServices from "../../services/TodoService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";
import { Pencil, Trash2 } from "lucide-react";

const TodoCard = ({ allTask, getUserTask, onEdit }) => {
  // delete handler
  const handleDelete = async (id) => {
    try {
      await todoServices.deleteTodo(id);
      toast.success("Task deleted successfully");
      getUserTask();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 col-span-full">
      {allTask?.map((task) => (
        <div
          className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-4 flex flex-col gap-3"
          key={task?._id}
        >
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-white font-medium text-sm leading-snug">
              {task?.title}
            </h3>
            <span
              className={
                task?.isCompleted === true
                  ? "bg-green-950 text-green-400 text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                  : "bg-yellow-950 text-yellow-400 text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
              }
            >
              {task?.isCompleted === true ? "Completed" : "Incomplete"}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
            {task?.description}
          </p>

          <div className="mt-auto pt-3 border-t border-[#1f1f1f] flex justify-between items-center">
            <span className="text-xs text-zinc-600">
              {formatDate(task?.createdAt)}
            </span>
            <div className="flex gap-2">
              <button
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="Edit"
                onClick={() => onEdit(task)}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                title="Delete Task"
                onClick={() => handleDelete(task?._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;
