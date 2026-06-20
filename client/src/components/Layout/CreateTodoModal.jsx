import React from "react";
import toast from "react-hot-toast";
import todoServices from "../../services/TodoService";
import { getErrorMessage } from "../../utils/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

const CreateTodoModal = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask,
}) => {
  // handle close
  const handleClose = () => {
    setShowModal(false);
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData?.user?.id;
      const data = { title, description, createdBy };
      if (!title || !description) {
        return toast.error("Please provide title and description");
      }
      await todoServices.createTodo(data);
      setShowModal(false);
      getUserTask();
      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="bg-[#111111] border border-[#1f1f1f] max-w-md p-6 text-white">
        <DialogHeader>
          <DialogTitle className="text-white font-semibold text-base">Add new task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Description</label>
            <textarea
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600 min-h-[100px]"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Task description"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center border border-[#1f1f1f] hover:bg-[#1f1f1f] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            onClick={handleSubmit}
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoModal;
